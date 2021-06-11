import React from 'react';

import { useCMS } from 'contexts/cms';
import { CMSConfigSettings, CMSEditProps } from 'types';

export interface ChildrenProps extends CMSConfigSettings {
  allowed?: string[];
  self?: boolean;
}

export const TYPE_IDENTIFIER = 'input/children';
export const type = (settings: ChildrenProps = {}) => {
  return {
    ...settings,
    type: TYPE_IDENTIFIER,
  };
};

const Children: React.FC<CMSEditProps<any> & ChildrenProps> = ({
  allowed = [],
  // self = false,
  label,
  onChange,
  // ...props
}) => {
  const { config } = useCMS();
  const { components } = config;

  const available =
    allowed.length > 0 ? components.filter(({ type }) => allowed.includes(type)) : components;
  return (
    <label>
      {label}
      {available.map(({ title, type }) => (
        <button key={type} onClick={() => onChange(type)}>
          {title}
        </button>
      ))}
      {/* <input
        {...props}
        type="file"
        onChange={e => {
          onChange('changed');
        }}
      /> */}
    </label>
  );
};

export default Children;
