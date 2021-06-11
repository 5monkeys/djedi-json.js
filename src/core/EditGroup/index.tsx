import ReactDOM from 'react-dom';

import Button from 'components/Button';
import Modal from 'components/Modal';
import { useCMS } from 'contexts/cms';
import { useEdit } from 'contexts/editcontext';
import styles from './EditGroup.module.css';

export type EditGroupProps = {
  content: Record<string, any>; // todo, type this correctly.
};

const EditGroup: React.FC<EditGroupProps> = ({ content }) => {
  const { config } = useCMS();
  const { patch, editing, tree, ref, setEdit } = useEdit();

  return editing ? (
    <Modal className={styles.root}>
      {Object.entries(content).map(([k, editConfig]) => {
        // for now; opt out of displaying children as a prop here.
        // if (k === 'children') {
        //   return null;
        // }
        const { type, ...editProps } = editConfig;
        const { Component } = config.edit[type];

        const handleChange = (v: any) => {
          patch({ [k]: v });
        };

        return (
          <section className={styles.layout} key={k}>
            <Component label={k} value={tree.content[k]} {...editProps} onChange={handleChange} />
          </section>
        );
      })}
      <Button onClick={() => setEdit(false)}>Close</Button>
    </Modal>
  ) : null;
};

export default EditGroup;
