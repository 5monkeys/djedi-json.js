import { get, set, unset } from 'lodash-es';

import { createEmpty } from '../Node';
import { TreeReducerAction } from './types';
import { cleanTree } from './utils';

export const reducer = (state: NodeTreeItem, action: TreeReducerAction) => {
  switch (action.type) {
    case 'replace':
      return action.payload;
    case 'empty':
      return createEmpty('');
    case 'add': {
      const nstate = { ...state };
      const parent = get(nstate, action.path, []);
      set(nstate, action.path, [...parent, action.payload]);

      return nstate;
    }

    case 'patch': {
      const nstate = { ...state };
      set(nstate, action.path, action.payload);

      return nstate;
    }

    case 'delete': {
      const nstate = { ...state };
      unset(nstate, action.path);

      return cleanTree(nstate);
    }
    default:
      throw new Error('Invalid action');
  }
};

export default reducer;
