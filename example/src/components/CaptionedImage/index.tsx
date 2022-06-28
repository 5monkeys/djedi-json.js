import React from 'react';
import cx from 'classnames';
import { useEdit } from 'djedi-json';

import Button from '../Button';
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
  const { move, tree } = useEdit();

  const onClick = (step: number) => move({ ...tree.content }, step);

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
        <Button onClick={() => onClick(1)}>Move down</Button>
        <Button onClick={() => onClick(-1)}>Move up</Button>
        <Button onClick={() => onClick(-100)}>Move to top</Button>
      </figcaption>
    </figure>
  );
};

export default CaptionedImage;
