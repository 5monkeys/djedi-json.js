import React from 'react';

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

  React.useEffect(() => {
    ref.current?.addEventListener('keyup', handleKeyDown);
    return ref.current?.removeEventListener('keyup', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div>
      <h1 className={styles.root} contentEditable ref={ref} suppressContentEditableWarning>
        {children}
      </h1>
    </div>
  );
};

export default Heading;
