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
  const { Component, content: configContent = {} } = config;
  const { isomorphic } = configContent;

  const childrenConfig = React.useMemo(() => {
    return Object.values(configContent).find((c: ComponentConfig) => c.type === 'input/children');
  }, [configContent]); // todo: Use a nice way to find all active child-like input types

  /** The path to this component in the entire tree. */
  const treePath = React.useMemo(() => path.join('.'), [path]);

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
    (type: string, opts?: { index?: number; content?: Record<string, any> }) => {
      let { index, content } = opts ?? {};

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

  const handleRemove = React.useCallback(() => remove(), [remove]);

  const toggleOpen = React.useCallback((bool: boolean) => setOver(bool), [setOver]);

  const handleOpen = React.useCallback(
    (open: boolean) => (e: React.MouseEvent) => {
      e.stopPropagation();
      toggleOpen(open);
    },
    []
  );

  const handleEdit = React.useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setEdit(v => !v);
  }, []);

  const handleSetEdit = React.useCallback(() => {
    if (config.editOnClick) {
      return () => setEdit(true);
    }
  }, [config.editOnClick]);

  const handleShift = React.useCallback(
    (by: -1 | 1) => (e: React.MouseEvent) => {
      e.stopPropagation();
      shift(by);
    },
    [shift]
  );

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

  const contextValue = React.useMemo(
    // prettier-ignore
    () => ({ editing, tree, setEdit, patch, remove, path, config, parentType, ref, append, insert, shift, move }),
    // prettier-ignore
    [editing, tree, setEdit, patch, remove, path, config, parentType, ref, append, insert, shift, move]
  );

  return (
    <EditContext.Provider value={contextValue}>
      <div className={styles.path} data-path={treePath}>
        {isomorphic ? (
          <Component key={tree.__ref} onChange={patch} {...componentProps} />
        ) : (
          <>
            <span
              ref={ref}
              onClick={handleSetEdit()}
              className={cx(styles.root, { [styles.clickable]: config.editOnClick })}
              onMouseEnter={handleOpen(true)}
              onMouseLeave={handleOpen(false)}
            >
              <Component {...componentProps} />

              {Boolean(over && (config.removable || config.editable || config.movable)) && (
                <span className={styles.toolbar}>
                  {config.editable && (
                    <button onClick={handleEdit}>
                      <EditSVG fill="currentColor" />
                    </button>
                  )}

                  {config.removable && (
                    <button onClick={handleRemove}>
                      <DeleteSVG fill="currentColor" />
                    </button>
                  )}

                  {config.movable && (
                    <>
                      <button onClick={handleShift(-1)}>
                        <UpSVG fill="currentColor" />
                      </button>
                      <button onClick={handleShift(1)}>
                        <DownSVG fill="currentColor" />
                      </button>
                    </>
                  )}
                </span>
              )}
            </span>
            {editing && <EditGroup content={configContent} />}
          </>
        )}
      </div>
    </EditContext.Provider>
  );
};

export default React.memo(Editable);
