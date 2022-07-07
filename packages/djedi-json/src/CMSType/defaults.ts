import { EditConfig } from '../types';
import SelectEdit, { TYPE_IDENTIFIER as SELECT_TYPE_IDENTIFIER } from './edits/Select';
import StringEdit, { TYPE_IDENTIFIER as STRING_TYPE_IDENTIFIER } from './edits/String';

export const DEFAULT_EDIT_MAP: EditConfig = {
  [STRING_TYPE_IDENTIFIER]: {
    Component: StringEdit,
  },
  [SELECT_TYPE_IDENTIFIER]: {
    Component: SelectEdit,
  },
};

export default DEFAULT_EDIT_MAP;
