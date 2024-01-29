import { ChildrenProps } from './type';

export const TYPE_IDENTIFIER = 'input/children';

export const type = (settings: ChildrenProps = {}) => {
  return {
    append: true,
    ...settings,
    type: TYPE_IDENTIFIER,
  };
};
