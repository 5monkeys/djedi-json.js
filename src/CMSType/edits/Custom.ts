import { CMSConfigSettings } from 'types';

export interface CustomProps extends CMSConfigSettings {
  type: string;
  isomorphic?: boolean;
}

export const type = (settings: CustomProps) => {
  return {
    isomorphic: false,
    ...settings,
  };
};
