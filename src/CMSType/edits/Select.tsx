import React from 'react';

import { CMSConfigSettings, CMSEditProps } from 'types';
import inputStyles from './Input.module.css';

export interface SelectProps extends CMSConfigSettings {
  settings: Omit<React.HTMLProps<HTMLSelectElement>, 'children' | 'value'>;
  options: Array<{ value: string; label: string } | string | number>;
  nullable?: boolean;
}

export const TYPE_IDENTIFIER = 'input/select';
export const type = (settings = {}) => {
  return {
    nullable: true,
    multiple: false,
    ...settings,
    type: TYPE_IDENTIFIER,
  };
};

const Select: React.FC<SelectProps & CMSEditProps<string | string[]>> = ({
  label,
  options,
  value,
  settings,
  nullable,
  onChange,
}) => {
  const values = options.map(option => {
    if (typeof option === 'string' || typeof option === 'number') {
      return {
        value: option,
        label: option,
      };
    }
    return option;
  });

  return (
    <label className={inputStyles.label}>
      <span className={inputStyles.labelText}>{label}</span>
      <select
        className={inputStyles.input}
        {...settings}
        value={value}
        onChange={e => {
          onChange(e.target.value);
        }}
      >
        {nullable && <option value={undefined}></option>}
        {values.map(o => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Select;
