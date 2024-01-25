import { get, set, unset } from 'lodash-es';
import { NodeTreeItem } from '../../types';

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
      const nstate = structuredClone(state);
      const parent = get(nstate, action.path, []);
      set(nstate, action.path, [...parent, action.payload]);

      return nstate;
    }

    case 'insert': {
      const nstate = structuredClone(state);

      const index = Number(action.at.at(-1));

      const siblingPath = action.at.slice(0, -1);
      const siblings = get(nstate, siblingPath);

      set(nstate, siblingPath, [
        ...siblings.slice(0, index),
        action.payload,
        ...siblings.slice(index),
      ]);

      return nstate;
    }

    case 'patch': {
      const nstate = structuredClone(state);

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
      const nstate = structuredClone(state);
      unset(nstate, action.path);

      return cleanTree(nstate);
    }

    case 'move': {
      const nstate = structuredClone(state);

      if (!Array.isArray(action.from) || !Array.isArray(action.to)) {
        throw new Error('move action requires arrays');
      }

      const from = [...action.from];
      const to = [...action.to];

      // to and from become the path of their respective parent nodes
      const fromIndex = parseInt(from.pop());
      const toIndex = parseInt(to.pop());

      // `fromParent` and `toParent` should reference the same array
      // if the element is only moved within an array, otherwise the
      // element will be removed from the fromParent array, but the
      // change won't be reflected in the toParent array and thus not
      // in `nstate`.
      //
      // In other words, don't do this:
      // const fromParent = [...get(nstate, from)];
      // const toParent = [...get(nstate, to)];
      const fromParent = get(nstate, from);
      const toParent = get(nstate, to);

      const element = fromParent.splice(fromIndex, 1)[0];

      if (typeof element === 'undefined') {
        throw new Error("element doesn't exist");
      }

      toParent.splice(toIndex, 0, element);

      set(nstate, from, fromParent);
      set(nstate, to, toParent);

      return nstate;
    }

    default:
      throw new Error('Invalid action');
  }
};

export default reducer;
