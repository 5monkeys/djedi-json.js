import styles from './Heading.module.css';

const Heading: React.FC = ({ children = 'Placeholder' }) => {
  return <h1 className={styles.root}>{children}</h1>;
};

export default Heading;
