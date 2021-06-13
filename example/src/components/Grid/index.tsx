import React from 'react';

import styles from './Grid.module.css';

export type GridProps = React.HTMLProps<HTMLDivElement>;

const Grid: React.FC<GridProps> = ({ children }) => {
  return <div className={styles.root}>{children}</div>;
};

export default Grid;
