import { CMSConfigSettings } from 'types';

export interface IsomorphicCustom {
  isomorphic?: boolean;
}
export interface CustomProps extends CMSConfigSettings {
  type: string;
}

export const type = (settings: CustomProps | IsomorphicCustom) => {
  return {
    isomorphic: false,
    ...settings,
  };
};
