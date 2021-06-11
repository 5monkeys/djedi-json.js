import React from 'react';
import cx from 'classnames';

import styles from './Hero.module.css';

export interface HeroProps {
  image: string;
  text?: string;
}

const Hero: React.FC<HeroProps> = ({ text, image }) => {
  const [loaded, setLoaded] = React.useState(false);

  return (
    <div className={styles.root}>
      <span className={styles.size}>
        <img
          src={image}
          onLoad={() => setLoaded(true)}
          className={cx(styles.image, { [styles.loaded]: loaded })}
        />
        <h1>{text && text}</h1>
      </span>
    </div>
  );
};

export default Hero;
