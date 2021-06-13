import { ChildrenProps } from './type';

export const TYPE_IDENTIFIER = 'input/children';
export const type = (settings: ChildrenProps = {}) => {
  return {
    ...(settings || {}),
    type: TYPE_IDENTIFIER,
  };
};
