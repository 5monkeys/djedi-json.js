import React from 'react';
import cx from 'classnames';

import styles from './Modal.module.css';

export type ModalProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
const Modal: React.FC<ModalProps> = ({ children, ...props }) => {
  return (
    <div className={styles.backdrop}>
      <div {...props}>
        <div className={styles.inner}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
