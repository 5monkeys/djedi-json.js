import { CustomProps, IsomorphicCustom } from './type';

export const type = (settings: CustomProps | IsomorphicCustom) => {
  return {
    isomorphic: false,
    ...settings,
  };
};
