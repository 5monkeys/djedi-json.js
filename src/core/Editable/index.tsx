import React from 'react';

import { useCMS } from 'contexts/cms';
import EditContext, { useEdit } from 'contexts/editcontext';
import Append from 'core/Append';
// import { useGetEdit } from 'core/hooks/useGetEdit';
import EditGroup from 'core/EditGroup';
import { useGetEdit } from 'core/hooks/useGetEdit';
import { ComponentConfig, NodeContentType, NodeTreeItem } from 'types';
import DeleteSVG from '../../icons/delete.svg';
import EditSVG from '../../icons/edit.svg';
import { createEmpty } from '../../utils';
// import HistorySVG from '../../icons/history.svg';
import styles from './Editable.module.css';

const Toolbar = () => {
  const { setEdit, remove } = useEdit();

  return (
    <span className={styles.toolbar}>
      <button onClick={() => setEdit(v => !v)}>
        <EditSVG fill="currentColor" />
      </button>
      <button onClick={remove}>
        <DeleteSVG fill="currentColor" />
      </button>
    </span>
  );
};

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
  // const edit = useGetEdit(config.type);

  // STATES
  const [editing, setEdit] = React.useState(false);
  const [over, setOver] = React.useState(false);
  const editConfig = useGetEdit(tree.type);

  console.log('CONFIG', editConfig);

  // DERIVED
  const { Component, content } = config;

  const hasChild = Object.values(content).some((c: ComponentConfig) => c.type === 'input/children'); // todo: Use a nice way to find all active child-like input types

  const append = React.useCallback(
    (type: string) =>
      setTree({ payload: createEmpty(type), type: 'add', path: [...path, 'content', 'children'] }),
    [path, setTree]
  );

  const patch = React.useCallback(
    (content: NodeContentType) => {
      setTree({ payload: { ...tree, content }, path, type: 'patch' });
    },
    [path, tree, setTree]
  );

  const remove = React.useCallback(() => setTree({ type: 'delete', path }), [path, setTree]);

  const toggleOpen = (bool: boolean) => {
    setOver(bool);
  };

  return (
    <EditContext.Provider value={{ editing, tree, setEdit, patch, remove, path, ref, append }}>
      <span
        ref={ref}
        className={styles.root}
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

        {over && <Toolbar />}
      </span>
      {editing && <EditGroup content={content} />}
    </EditContext.Provider>
  );
};

export default Editable;
