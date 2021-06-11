import React from 'react';

import styles from './Button.module.css';

export type ButtonProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
const Button: React.FC<{ onClick: () => void }> = ({ children, ...props }) => {
  return (
    <button type={'button'} {...props} className={styles.root}>
      {children}
    </button>
  );
};

export default Button;
