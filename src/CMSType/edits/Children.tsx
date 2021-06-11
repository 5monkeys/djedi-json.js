import { CMSConfigSettings } from 'types';

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
