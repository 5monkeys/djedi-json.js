import React from 'react';
import cx from 'classnames';

import styles from './Modal.module.css';

export interface ModalProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  onClose?: () => void;
}
const Modal: React.FC<ModalProps> = ({ children, onClose, className, ...props }) => {
  const handleOnClick = React.useCallback(() => onClose?.(), [onClose]);

  return (
    <>
      <style>{`body{overflow: "hidden";}`}</style>
      <div className={styles.backdrop} onClick={handleOnClick}>
        <div className={cx(styles.root, className)} {...props} onClick={e => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
