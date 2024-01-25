import React, { ReactNode } from 'react';
import { get } from 'lodash-es';
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

  // CONTEXTS
  const { tree: CMSTree, setTree } = useCMS();

  // DERIVED
  const { Component, content = {} } = config;
  const { isomorphic } = content;

  const childrenConfig = React.useMemo(() => {
    return Object.values(content).find((c: ComponentConfig) => c.type === 'input/children');
  }, [content]); // todo: Use a nice way to find all active child-like input types

  /** The path to this component in the entire tree. */
  const treePath = React.useMemo(() => path.join('.'), [path]);
  const uuid = React.useMemo(() => crypto.randomUUID?.(), []);

  /** The React key. Just the path is not unique enough to provide an identity during insertion and deletion. */
  const key = React.useMemo(() => `${treePath}+${uuid}`, [treePath, uuid]);

  const parentType: string | null = React.useMemo(() => {
    const parentPath = path.slice(0, -3);
    const parent = get(CMSTree, parentPath);
    return parent?.type ?? null;
  }, [path, tree]);

  // STATES
  const [editing, setEdit] = React.useState(false);
  const [over, setOver] = React.useState(false);

  const append = React.useCallback(
    (type: string, content?: Record<string, any>) => {
      setTree({
        payload: createEmpty(type, content),
        type: 'add',
        path: [...path, 'content', 'children'],
      });
    },
    [path, tree, setTree]
  );

  const insert = React.useCallback(
    (type: string, { index, content }: { index?: number; content?: Record<string, any> }) => {
      // Default to the index below the inserting component
      index ??= Number.parseInt(path.at(-1)) + 1;

      if (Number.isNaN(index)) {
        console.error('Could not insert, invalid index');
        return;
      }

      const at = [...path];
      at[at.length - 1] = String(index);

      setTree({
        payload: createEmpty(type, content),
        type: 'insert',
        at,
      });
    },
    [path, setTree]
  );

  const patch = React.useCallback(
    (content: NodeContentType) => {
      setTree({
        payload: { ...tree, content },
        path,
        type: 'patch',
      });
    },
    [path, tree, setTree]
  );

  const shift = React.useCallback(
    (steps: number) => {
      const dest = [...path];
      const i = parseInt(dest[dest.length - 1]) + steps;
      if (isNaN(i)) return;
      dest[dest.length - 1] = i.toString();
      move(dest);
    },
    [path, tree, setTree]
  );

  const move = React.useCallback(
    (to: Path) => {
      setTree({
        from: path,
        to,
        type: 'move',
      });
    },
    [path, tree, setTree]
  );

  const remove = React.useCallback(() => setTree({ type: 'delete', path }), [path, setTree]);

  const toggleOpen = React.useCallback((bool: boolean) => setOver(bool), [setOver]);

  const componentProps = React.useMemo(() => {
    return {
      ...tree?.content,
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
  }, [tree, childrenConfig, append, config, children]);

  return (
    <EditContext.Provider
      value={{
        editing,
        tree,
        setEdit,
        patch,
        remove,
        path,
        config,
        parentType,
        ref,
        append,
        insert,
        shift,
        move,
      }}
    >
      <div data-path={treePath}>
        {isomorphic ? (
          <Component key={key} onChange={patch} {...componentProps} />
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
