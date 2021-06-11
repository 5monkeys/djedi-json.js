import { useCMS } from 'contexts/cms';
import EditorTree from './EditorTree';
import IsolateStyles from './IsolateStyles';
import styles from './Renderer.module.css';

const Preview: React.FC = () => {
  const { tree } = useCMS();

  return (
    <IsolateStyles className={styles.isolated}>{tree && <EditorTree tree={tree} />}</IsolateStyles>
  );
};

export default Preview;
