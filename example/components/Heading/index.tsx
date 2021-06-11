import styles from './Heading.module.css';

const Heading: React.FC<{ children: string; onChange?: (t: string) => void }> = ({
  children = 'Placeholder',
  onChange,
}) => {
  return (
    <h1 className={styles.root}>
      {onChange ? (
        <input value={children} onChange={e => onChange({ children: e.target.value })} />
      ) : (
        children
      )}
    </h1>
  );
};

export default Heading;
