import React from 'react';

import styles from './Hero.module.css';

export interface HeroProps {
  image?: string;
  text?: string;
}

const Hero: React.FC<HeroProps> = ({ text, image = '' }) => {
  return (
    <div className={styles.root} style={{ backgroundImage: `url(${image})` }}>
      <h1>{text && text}</h1>
    </div>
  );
};

export default Hero;
