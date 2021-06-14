import React from 'react';
import cx from 'classnames';

import { useCMS } from '../../contexts/cms';
import EditContext from '../../contexts/editcontext';
import DeleteSVG from '../../icons/delete.svg';
import EditSVG from '../../icons/edit.svg';
import Append from '../Append';
import EditGroup from '../EditGroup';
import { createEmpty } from '../Node';
import styles from './Editable.module.css';

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
}> = ({ tree, config, children, path = [] }) => {
  // A ref to the parent. Could potentially be used to pin something or measure it to allow content-jumping.
  const ref = React.useRef<HTMLSpanElement>(null);

  // CONTEXTS
  const { setTree } = useCMS();

  // STATES
  const [editing, setEdit] = React.useState(false);
  const [over, setOver] = React.useState(false);

  // DERIVED
  const { Component, content = {} } = config;
  const { isomorphic } = content;

  const hasChild = Object.values(content).some((c: ComponentConfig) => c.type === 'input/children'); // todo: Use a nice way to find all active child-like input types

  const append = React.useCallback(
    (type: string) => {
      setTree({ payload: createEmpty(type), type: 'add', path: [...path, 'content', 'children'] });
    },
    [path, setTree]
  );

  const patch = React.useCallback(
    (content: NodeContentType) => {
      setTree({
        payload: { ...tree, content },
        path: path.length === 0 ? '' : path,
        type: 'patch',
      });
    },
    [path, tree, setTree]
  );

  const remove = React.useCallback(() => setTree({ type: 'delete', path }), [path, setTree]);

  const toggleOpen = (bool: boolean) => {
    setOver(bool);
  };

  return (
    <EditContext.Provider value={{ editing, tree, setEdit, patch, remove, path, ref, append }}>
      {isomorphic ? (
        <Component onChange={patch} {...tree.content} />
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
            <Component
              {...(tree?.content || {})}
              {...(hasChild
                ? {
                    children: (
                      <>
                        {children}
                        <Append onClick={append} config={config} />
                      </>
                    ),
                  }
                : {})}
            />

            {over && (
              <span className={styles.toolbar}>
                <button onClick={() => setEdit(v => !v)}>
                  <EditSVG fill="currentColor" />
                </button>
                <button onClick={remove}>
                  <DeleteSVG fill="currentColor" />{' '}
                </button>
              </span>
            )}
          </span>
          {editing && <EditGroup content={content} />}
        </>
      )}
    </EditContext.Provider>
  );
};

export default Editable;
