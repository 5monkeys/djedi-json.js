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

      if (action.path.length > 0) {
        set(nstate, action.path, action.payload);
      } else {
        Object.entries(action.payload).forEach(([k, v]) => {
          nstate[k] = v;
        });
      }

      return nstate;
    }

    case 'delete': {
      const nstate = { ...state };
      unset(nstate, action.path);

      return cleanTree(nstate);
    }

    case 'move': {
      const nstate = { ...state };

      if (Array.isArray(action.path)) {
        const path = [...action.path];
        const leaf = path.splice(-1, 1)[0]; // path is now the path of the parent
        const siblings = [...get(nstate, path)]; // siblings, including the item that will be moved
        const from = parseInt(leaf);
        const to = Math.max(Math.min(from + action.steps, siblings.length - 1), 0);

        const element = siblings[from];

        // implicitly handle isNaN(from) since siblings[NaN] is undefined
        if (typeof element !== "undefined") {
          // perform the actual move
          siblings.splice(from, 1);
          siblings.splice(to, 0, element);
  
          // add mutated array to new state
          set(nstate, path, siblings);
        }
      } else {
        // todo
      }

      return nstate;
    }

    default:
      throw new Error('Invalid action');
  }
};

export default reducer;
