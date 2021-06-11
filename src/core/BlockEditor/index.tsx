import ReactDOM from 'react-dom';

import { useCMS } from 'contexts/cms';
import { useEdit } from 'contexts/editcontext';
import Button from 'core/components/Button';
import styles from './BlockEditor.module.scss';

export type BlockEditorProps = {
  content: Record<string, any>; // todo, type this correctly.
};

const BlockEditor: React.FC<BlockEditorProps> = ({ content }) => {
  const { config } = useCMS();
  const { patch, data, ref, setEditing } = useEdit();

  const rect = ref?.current?.firstElementChild?.getBoundingClientRect();

  return ReactDOM.createPortal(
    <div
      className={styles.root}
      style={{
        top: `${document.body.scrollTop + rect?.bottom + 15 || 15}px`,
      }}
    >
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
            <Component label={k} value={data[k]} {...editProps} onChange={handleChange} />
          </section>
        );
      })}
      <Button onClick={() => setEditing(false)}>Close</Button>
    </div>,
    document.body
  );
};

export default BlockEditor;
