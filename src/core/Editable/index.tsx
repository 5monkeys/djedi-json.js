import React from 'react';

import { useCMS } from 'contexts/cms';
import EditContext from 'contexts/editcontext';
import Append from 'core/Append';
// import { useGetEdit } from 'core/hooks/useGetEdit';
import BlockEditor from 'core/BlockEditor';
import { ComponentConfig } from 'types';
import DeleteSVG from '../../icons/delete.svg';
import EditSVG from '../../icons/edit.svg';
import { createEmpty } from '../../utils';
// import HistorySVG from '../../icons/history.svg';
import styles from './Editable.module.scss';

/**
 * Editable, wraps the child component with some tooling for talking to the admin.
 *
 * @param config a Config for a single Component.
 * @returns a rendered component
 */
const Editable: React.FC<{
  config: ComponentConfig;
  data?: Record<string, any>;
  path: string[];
}> = ({ data, config, children, path = [] }) => {
  // A ref to the parent. Could potentially be used to pin something or measure it to allow content-jumping.
  const ref = React.useRef<HTMLSpanElement>(null);

  // CONTEXTS
  const { setTree } = useCMS();
  // const edit = useGetEdit(config.type);

  // STATES
  // landing in this component with editing set to true should be possible.
  const [editing, setEditing] = React.useState(false);
  // const [position, setPosition] = React.useState({});
  // the state of the component. Can be updated from above or from the edit.
  // const [state, setState] = React.useState(passedData || {});
  const [over, setOver] = React.useState(false);

  // EFFECTS
  // keep in sync with data from above.
  // React.useEffect(() => {
  //   passedData && setState(passedData);
  // }, [passedData]);

  // DERIVED
  const { Component, content } = config;

  const hasChild = Object.values(content).some((c: ComponentConfig) => c.type === 'input/children'); // todo: Use a nice way to find all active child-like input types

  const appendNode = (type: string) =>
    setTree({ payload: createEmpty(type), type: 'add', path: [...path, 'content', 'children'] });

  const patch = (payload: Record<string, any>) => {
    setTree({ payload: { ...data, ...payload }, path, type: 'patch' });
  };

  const remove = () => setTree({ type: 'delete', path });

  const toggleOpen = (bool: boolean) => {
    setOver(bool);
  };

  return (
    <EditContext.Provider value={{ editing, data, setEditing, patch, path, ref }}>
      <span
        ref={ref}
        // onClick={e => {
        //   e.stopPropagation();
        //   setEditing(v => !v);
        // }}
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
          {...data}
          {...(hasChild
            ? {
                children: (
                  <>
                    {children}
                    <Append onClick={appendNode} config={config} />
                  </>
                ),
              }
            : {})}
        />

        {over && (
          <span
            className={styles.toolbar}
            // style={{
            //   right: `${position.left + position.height / 2}px`,
            //   top: `${document.scrollTop + position.top + position.width / 2}px`,
            // }}
          >
            <button onClick={() => setEditing(v => !v)}>
              <EditSVG fill="currentColor" />
            </button>
            <button onClick={remove}>
              <DeleteSVG fill="currentColor" />
            </button>
          </span>
        )}
      </span>
      {editing && <BlockEditor content={content} />}
    </EditContext.Provider>
  );
};

export default Editable;
