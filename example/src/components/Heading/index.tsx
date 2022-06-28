import React from 'react';
import { useEdit } from 'djedi-json';

import Button from '../Button';
import styles from './Heading.module.css';

const Heading: React.FC<{ children: string; onChange?: (t: string) => void }> = ({
  children = 'Placeholder',
  onChange,
}) => {
  const ref = React.useRef<HTMLHeadingElement>(null);
  const handleKeyDown = React.useCallback(
    e => {
      onChange && onChange(e.target.innerText);
    },
    [onChange]
  );
  const { move, tree } = useEdit();
  const { content } = tree;

  const onClick = React.useCallback((step: number) => move({ ...content }, step), [content]);

  React.useEffect(() => {
    ref.current?.addEventListener('keyup', handleKeyDown);
    return ref.current?.removeEventListener('keyup', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div>
      <h1 className={styles.root} contentEditable ref={ref} suppressContentEditableWarning>
        {children}
      </h1>
      <Button onClick={() => onClick(1)}>Move down</Button>
      <Button onClick={() => onClick(-1)}>Move up</Button>
    </div>
  );
};

export default Heading;
