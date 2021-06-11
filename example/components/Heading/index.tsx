import styles from './Heading.module.scss';

const Heading: React.FC = ({ children = 'Placeholder' }) => {
  return <h1 className={styles.root}>{children}</h1>;
};

export default Heading;
