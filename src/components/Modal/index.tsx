import React from 'react';
import cx from 'classnames';

import styles from './Modal.module.css';

export interface ModalProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  onClose?: () => void;
}
const Modal: React.FC<ModalProps> = ({ children, onClose, className, ...props }) => {
  return (
    <>
      <style>{`body{overflow: "hidden";}`}</style>
      <div
        className={styles.backdrop}
        onClick={() => {
          onClose && onClose();
        }}
      >
        <div className={cx(styles.root, className)} {...props}>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
