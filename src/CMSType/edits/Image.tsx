import React from 'react';

import { CMSConfigSettings, CMSEditProps } from 'types';

export type ImageProps = CMSConfigSettings;

export const TYPE_IDENTIFIER = 'input/image';
export const type = (settings: ImageProps = {}) => {
  return {
    ...(settings || {}),
    type: TYPE_IDENTIFIER,
  };
};

const Image: React.FC<ImageProps & CMSEditProps<string>> = ({
  label,
  value,
  onChange,
  ...props
}) => {
  // const [src, setSrc] = React.useState(value);
  const handleUpload = React.useCallback(() => {
    // fake
    onChange('https://placekitten.com/300/300');
  }, [onChange]);

  return (
    <form>
      <label>
        {/* {label}({value})<img src={src} height={30} /> */}
        <input {...props} type="file" name="image-file" accept="image/*" onChange={handleUpload} />
      </label>
    </form>
  );
};

export default Image;
