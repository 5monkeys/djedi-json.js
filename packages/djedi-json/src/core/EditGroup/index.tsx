import React from 'react';

import Button from '../../components/Button';
import Modal from '../../components/Modal';
import { useCMS } from '../../contexts/cms';
import { useEdit } from '../../contexts/editcontext';
import CloseSVG from '../../icons/close.svg';
import { ComponentConfig } from '../../types';
import styles from './EditGroup.module.css';

export type EditGroupProps = {
  content: Record<string, any>; // todo, type this correctly.
};

const EditGroup: React.FC<EditGroupProps> = ({ content }) => {
  const { config } = useCMS();
  const { patch, editing, tree, setEdit } = useEdit();

  const c: ComponentConfig | undefined = React.useMemo(
    () => config.components.find(({ type }) => type === tree.type),
    [config, tree]
  );

  const handleChange = React.useCallback(
    (k: string) => (v: any) => {
      patch({ ...tree?.content, [k]: v });
    },
    [tree, patch]
  );

  const handleSetEdit = React.useCallback((edit: boolean) => () => setEdit(edit), [setEdit]);

  const renderedComponents = React.useMemo(() => {
    return Object.entries(content).map(([k, editConfig]) => {
      const { type, ...editProps } = editConfig;
      const { Component } = config.edit[type];

      return (
        <section className={styles.layout} key={k}>
          <Component
            label={k}
            value={tree?.content[k] ?? undefined}
            {...editProps}
            onChange={handleChange(k)}
          />
        </section>
      );
    });
  }, [content, tree, handleChange, config.edit]);

  return editing ? (
    <Modal onClose={handleSetEdit(false)}>
      <div className={styles.separate}>
        <h2 className={styles.title}>{c?.title ?? ''}</h2>
        <p>{c?.description ?? ''}</p>

        {renderedComponents}

        <Button onClick={handleSetEdit(false)} className={styles.close}>
          <CloseSVG width="24px" fill="currentColor" />
        </Button>
      </div>
    </Modal>
  ) : null;
};

export default React.memo(EditGroup);
