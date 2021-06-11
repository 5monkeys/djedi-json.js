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
  image,
  text = 'caption',
}) => {
  return (
    <figure
      className={cx(styles.root, {
        [styles.black]: background === 'black',
        [styles.grey]: background === 'grey',
        [styles.white]: background === 'white',
      })}
    >
      <span className={styles.loading}>{image && <img src={image}></img>}</span>
      <figcaption>{text}</figcaption>
    </figure>
  );
};

export default CaptionedImage;
