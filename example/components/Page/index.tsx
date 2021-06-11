import styles from './Page.module.scss';

export interface PageProps {
  title?: string;
  sub?: string;
  meta?: string;
}
const Page: React.FC<PageProps> = ({
  title = 'Title',
  sub = 'Subtitle',
  meta = 'Meta',
  children,
}) => {
  return (
    <>
      <nav className={styles.nav}>
        <span className={styles.meta}>{meta}</span>
        <h1>{title}</h1>
        <p>{sub}</p>
      </nav>
      <main>{children}</main>
    </>
  );
};

export default Page;
