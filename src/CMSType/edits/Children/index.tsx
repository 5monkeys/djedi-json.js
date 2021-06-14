import { ChildrenProps } from './type';

export const TYPE_IDENTIFIER = 'input/children';
export const type = (settings: ChildrenProps = {}) => {
  return {
    injectButton: true,
    ...(settings || {}),
    type: TYPE_IDENTIFIER,
  };
};
