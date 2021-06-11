import React from 'react';

import { CMSConfigSettings, CMSEditProps } from 'types';
import inputStyles from './interactiveString.module.css';

export const TYPE_IDENTIFIER = 'interactive/string';

export const interactive = () => {
  return {
    type: TYPE_IDENTIFIER,
  };
};

const StringOverride: React.FC<CMSEditProps> = ({ value, onChange }) => {
  return (
    <div
      contentEditable
      value={value}
      className={inputStyles.input}
      type="text"
      onChange={e => onChange(e.target.value)}
    />
  );
};

export default StringOverride;
