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
    <h1 className={styles.root} contentEditable ref={ref}>
      {children}
    </h1>
  );
};

export default Heading;
