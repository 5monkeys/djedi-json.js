import React from 'react';
import cx from 'classnames';

import styles from './Button.module.css';

export type ButtonProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button type={'button'} {...props} className={cx(styles.root, className)}>
      {children}
    </button>
  );
};

export default Button;
