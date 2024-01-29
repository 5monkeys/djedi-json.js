import React from 'react';

import { useCMS } from '../../contexts/cms';
import AddIcon from '../../icons/add.svg';
import { ComponentConfig } from '../../types';
import styles from './Append.module.css';

type AppendProps = {
  onClick: (type: string) => void;
  config: ComponentConfig;
};

const filterChildren = (children: ComponentConfig[], config: ComponentConfig) => {
  const childConfig = Object.values(config.content).find(t => t.type === 'input/children');

  let allowed = [...children];

  if (!childConfig) {
    return children;
  }

  if (childConfig.allowed?.length > 0) {
    allowed = allowed.filter(c => childConfig.allowed.includes(c.type));
  }

  if (childConfig.self === false) {
    allowed = allowed.filter(c => c.type !== config.type);
  }

  return allowed;
};

const Append: React.FC<AppendProps> = ({ onClick, config }) => {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLButtonElement>(null);
  const { config: CMSConfig } = useCMS();

  const possibleChildren = React.useMemo(
    () => filterChildren(CMSConfig.components, config),
    [config, CMSConfig.components]
  );

  const handleClick = React.useCallback((type: string) => {
    setOpen(false);
    onClick(type);
  }, []);

  const handleIconClick = React.useCallback(() => {
    possibleChildren.length === 1 ? handleClick(possibleChildren[0].type) : setOpen(v => !v);
  }, [possibleChildren]);

  const handleChildClick = React.useCallback(
    (type: string) => () => handleClick(type),
    [handleClick]
  );

  return (
    <div className={styles.wrapper}>
      <button className={styles.button} onClick={handleIconClick} ref={ref}>
        <AddIcon />
      </button>

      {open && (
        <div className={styles.chooser}>
          {possibleChildren.map(s => (
            <button onClick={handleChildClick(s.type)} key={s.type}>
              {s.icon ?? s.title.substring(0, 1)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(Append);
