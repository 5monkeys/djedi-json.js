import React from 'react';

import styles from './Grid.module.css';

export type GridProps = React.HTMLProps<HTMLDivElement>;

const Grid: React.FC<GridProps> = ({ children, name }) => {
  return (
    <div className={styles.root}>
      {name}
      {children}
    </div>
  );
};

export default Grid;
