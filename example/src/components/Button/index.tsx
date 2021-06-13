import React from 'react';
import cx from 'classnames';

import styles from './Button.module.css';

export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  color?: 'gray' | 'black';
}

const Button: React.FC<ButtonProps> = ({ children, color = 'gray' } = {}) => {
  return (
    <button className={cx(styles.root, { [styles[`color-${color}`]]: color })}>{children}</button>
  );
};

export default Button;
