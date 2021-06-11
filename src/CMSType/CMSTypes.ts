import { EditConfig } from 'types';
import ChildrenEdit, { TYPE_IDENTIFIER as CHILDREN_TYPE_IDENTIFIER } from './edits/Children';
import ImageEdit, { TYPE_IDENTIFIER as IMAGE_TYPE_IDENTIFIER } from './edits/Image';
import SelectEdit, { TYPE_IDENTIFIER as SELECT_TYPE_IDENTIFIER } from './edits/Select';
import StringEdit, { TYPE_IDENTIFIER as STRING_TYPE_IDENTIFIER } from './edits/String';

export const DEFAULT_EDIT_MAP: EditConfig = {
  [IMAGE_TYPE_IDENTIFIER]: {
    Component: ImageEdit,
  },
  [STRING_TYPE_IDENTIFIER]: {
    Component: StringEdit,
  },
  [SELECT_TYPE_IDENTIFIER]: {
    Component: SelectEdit,
  },
  [CHILDREN_TYPE_IDENTIFIER]: {
    Component: ChildrenEdit,
  },
};

const CMSType = {
  image: ImageEdit,
  string: StringEdit,
  select: SelectEdit,
  children: ChildrenEdit,
};

export default CMSType;
