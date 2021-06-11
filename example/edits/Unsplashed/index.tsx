import React from 'react';

import { CMSEditProps } from 'types';

export const TYPE_IDENTIFIER = 'image/unsplashed';

export const UnsplashedImage = () => {
  return {
    type: TYPE_IDENTIFIER,
  };
};

const Unsplash: React.FC<CMSEditProps<string>> = ({ value, onChange }) => {
  const [term, setTerm] = React.useState(() => value?.split('?')?.[1]);
  const handleSave = () => {
    const img = `https://source.unsplash.com/500x800/?${term?.split(' ').join(',') || ''}`;
    onChange(img);
  };
  return (
    <label>
      Get a random image from unsplash
      <input
        value={term}
        placeholder="search for images"
        onChange={e => {
          setTerm(e.target.value);
        }}
      />
      <button onClick={handleSave}>Get image!</button>
    </label>
  );
};

export default Unsplash;
