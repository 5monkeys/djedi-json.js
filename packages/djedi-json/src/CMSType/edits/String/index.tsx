import React from 'react';

import inputStyles from '../../../components/Input/Input.module.css';
import { CMSEditProps } from '../../types';
import { StringProps } from './type';

export const TYPE_IDENTIFIER = 'input/string';

export const type = (settings: Partial<StringProps> = {}) => {
  return {
    ...(settings || {}),
    type: TYPE_IDENTIFIER,
  };
};

const String: React.FC<StringProps & CMSEditProps<string>> = ({
  label,
  value,
  onChange,
  settings,
}) => {
  return (
    <label className={inputStyles.label}>
      <span className={inputStyles.labelText}>{label}</span>
      <input
        {...(settings || {})}
        value={value}
        className={inputStyles.input}
        type="text"
        onChange={e => onChange(e.target.value)}
      />
    </label>
  );
};

export default String;
