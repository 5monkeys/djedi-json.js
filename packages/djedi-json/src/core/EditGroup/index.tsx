import React from 'react';

import Button from '../../components/Button';
import Modal from '../../components/Modal';
import { useCMS } from '../../contexts/cms';
import { useEdit } from '../../contexts/editcontext';
import CloseSVG from '../../icons/close.svg';
import styles from './EditGroup.module.css';

export type EditGroupProps = {
  content: Record<string, any>; // todo, type this correctly.
};

const EditGroup: React.FC<EditGroupProps> = ({ content }) => {
  const { config } = useCMS();
  const { patch, editing, tree, setEdit } = useEdit();
  const c: ComponentConfig | undefined = config.components.find(t => t.type === tree.type);

  const handleChange = (k: string) => (v: any) => {
    patch({ ...(tree?.content || {}), [k]: v });
  };

  return editing ? (
    <Modal onClose={() => setEdit(false)}>
      <div className={styles.separate}>
        <h2 className={styles.title}>{c?.title || ''}</h2>
        <p>{c?.description || ''}</p>
        {Object.entries(content).map(([k, editConfig]) => {
          // for now; opt out of displaying children as a prop here.
          if (k === 'children') {
            return null;
          }
          const { type, ...editProps } = editConfig;
          const { Component } = config.edit[type];

          return (
            <section className={styles.layout} key={k}>
              <Component
                label={k}
                value={tree?.content[k] || undefined}
                {...editProps}
                onChange={handleChange(k)}
              />
            </section>
          );
        })}
        <Button onClick={() => setEdit(false)} className={styles.close}>
          <CloseSVG width="24px" fill="currentColor" />
        </Button>
      </div>
    </Modal>
  ) : null;
};

export default EditGroup;
