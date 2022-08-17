import React, { ReactNode } from 'react';
import cx from 'classnames';

import { useCMS } from '../../contexts/cms';
import EditContext from '../../contexts/editcontext';
import DeleteSVG from '../../icons/delete.svg';
import EditSVG from '../../icons/edit.svg';
import UpSVG from '../../icons/up.svg';
import DownSVG from '../../icons/down.svg';
import Append from '../Append';
import EditGroup from '../EditGroup';
import { createEmpty } from '../Node';
import styles from './Editable.module.css';
import { ComponentConfig, NodeContentType, NodeTreeItem } from '../../types';
import { Path } from '../Tree/types';

/**
 * Editable, wraps the child component with some tooling for talking to the admin.
 *
 * @param config a Config for a single Component.
 * @returns a rendered component
 */

const Editable: React.FC<{
  config: ComponentConfig;
  tree: NodeTreeItem;
  path: string[];
  children?: ReactNode;
}> = ({ tree, config, children, path = [] }) => {
  // A ref to the parent. Could potentially be used to pin something or measure it to allow content-jumping.
  const ref = React.useRef<HTMLSpanElement>(null);

  // DERIVED
  const { Component, content = {} } = config;
  const { isomorphic } = content;

  const childrenConfig = Object.values(content).find(
    (c: ComponentConfig) => c.type === 'input/children'
  ); // todo: Use a nice way to find all active child-like input types

  // CONTEXTS
  const { setTree } = useCMS();

  // STATES
  const [editing, setEdit] = React.useState(false);
  const [over, setOver] = React.useState(false);

  const append = React.useCallback(
    (type: string, o?: Record<string, any>) => {
      setTree({
        payload: createEmpty(type, o),
        type: 'add',
        path: [...path, 'content', 'children'],
      });
    },
    [path, setTree]
  );

  const patch = React.useCallback(
    (_content: NodeContentType) => {
      setTree({
        payload: { ...tree, content: _content },
        path,
        type: 'patch',
      });
    },
    [path, tree, setTree]
  );

  const shift = React.useCallback((steps: number) => {
    const dest = [...path];
    const i = parseInt(dest[dest.length - 1]) + steps;
    if (isNaN(i)) return;
    dest[dest.length - 1] = i.toString();
    move(dest);
  }, [path, tree, setTree]);

  const move = React.useCallback((to: Path) => {
    setTree({
      from: path,
      to,
      type: 'move',
    });
  }, [path, tree, setTree]);

  const remove = React.useCallback(() => setTree({ type: 'delete', path }), [path, setTree]);

  const toggleOpen = (bool: boolean) => {
    setOver(bool);
  };

  const componentProps = {
    ...(tree?.content || {}),
    ...(childrenConfig
      ? {
          children: (
            <>
              {children}
              {childrenConfig.append && <Append onClick={append} config={config} />}
            </>
          ),
        }
      : {}),
  };

  return (
    <EditContext.Provider
      value={{ editing, tree, setEdit, patch, remove, path, ref, append, shift, move }}
    >
      <div data-path={path.join(".")}>
        {isomorphic ? (
          <Component onChange={patch} {...componentProps} />
        ) : (
          <>
            <span
              ref={ref}
              onClick={config.editOnClick ? () => setEdit(true) : undefined}
              className={cx(styles.root, { [styles.clickable]: config.editOnClick })}
              onMouseEnter={e => {
                e.stopPropagation();
                toggleOpen(true);
              }}
              onMouseLeave={e => {
                e.stopPropagation();
                toggleOpen(false);
              }}
            >
              <Component {...componentProps} />

              {Boolean(over && (config.removable || config.editable || config.movable)) && (
                <span className={styles.toolbar}>
                  {config.editable && (
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        setEdit(v => !v);
                      }}
                    >
                      <EditSVG fill="currentColor" />
                    </button>
                  )}
                  {config.removable && (
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        remove();
                      }}
                    >
                      <DeleteSVG fill="currentColor" />
                    </button>
                  )}
                  {config.movable && (
                    <>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          shift(-1);
                        }}
                      >
                        <UpSVG fill="currentColor" />
                      </button>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          shift(1);
                        }}
                      >
                        <DownSVG fill="currentColor" />
                      </button>
                    </>
                  )}
                </span>
              )}
            </span>
            {editing && <EditGroup content={content} />}
          </>
        )}
      </div>
    </EditContext.Provider>
  );
};

export default Editable;
