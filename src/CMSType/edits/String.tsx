import React, { HTMLAttributes } from 'react';

import { CMSConfigSettings, CMSEditProps } from 'types';
import inputStyles from './Input.module.css';

export interface StringProps
  extends CMSConfigSettings,
    React.DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement> {}

export const TYPE_IDENTIFIER = 'input/string';
export const type = (settings: StringProps = {}) => {
  return {
    ...settings,
    type: TYPE_IDENTIFIER,
  };
};

const String: React.FC<StringProps & CMSEditProps<string>> = ({
  label,
  value,
  onChange,
  ...settings
}) => {
  return (
    <label className={inputStyles.label}>
      <span className={inputStyles.labelText}>{label}</span>
      <input
        value={value}
        className={inputStyles.input}
        type="text"
        onChange={e => onChange(e.target.value)}
        {...settings}
      />
    </label>
  );
};

export default String;
