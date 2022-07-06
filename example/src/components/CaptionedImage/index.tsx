import React from 'react';
import cx from 'classnames';

import styles from './CaptionedImage.module.css';

export type CaptionedImageProps = {
  image: string;
  text: string;
  background?: 'black' | 'white' | 'grey';
};

const CaptionedImage: React.FC<CaptionedImageProps> = ({
  background = 'white',
  image = 'https://source.unsplash.com/random/500x300',
  text = 'caption',
}) => {
  return (
    <figure className={styles.root}>
      <img className={styles.image} src={image}></img>
      <figcaption
        className={cx(styles.caption, {
          [styles.black]: background === 'black',
          [styles.grey]: background === 'grey',
          [styles.white]: background === 'white',
        })}
      >
        {text}
      </figcaption>
    </figure>
  );
};

export default CaptionedImage;
