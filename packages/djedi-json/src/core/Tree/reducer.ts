import { get, set, unset } from 'lodash-es';
import { NodeTreeItem } from '../../types';

import { createEmpty } from '../Node';
import { TreeReducerAction } from './types';
import * as Tree from './utils';

export const reducer = (state: NodeTreeItem, action: TreeReducerAction) => {
  switch (action.type) {
    case 'replace': {
      const tree = structuredClone(action.payload);
      return Tree.addRefs(tree);
    }

    case 'empty': {
      return createEmpty('');
    }

    case 'add': {
      const tree = structuredClone(state);

      const parent = get(tree, action.path, []);
      set(tree, action.path, [...parent, action.payload]);

      return tree;
    }

    case 'insert': {
      const tree = structuredClone(state);

      const index = Number(action.at.at(-1));

      const siblingPath = action.at.slice(0, -1);
      const siblings = get(tree, siblingPath);

      set(tree, siblingPath, [
        ...siblings.slice(0, index),
        action.payload,
        ...siblings.slice(index),
      ]);

      return tree;
    }

    case 'patch': {
      const tree = structuredClone(state);

      if (action.path.length > 0) {
        set(tree, action.path, action.payload);
      } else {
        Object.entries(action.payload).forEach(([k, v]) => {
          tree[k] = v;
        });
      }

      return tree;
    }

    case 'delete': {
      const tree = structuredClone(state);
      unset(tree, action.path);
      return Tree.omitFalsy(tree);
    }

    case 'move': {
      const tree = structuredClone(state);

      if (!Array.isArray(action.from) || !Array.isArray(action.to)) {
        throw new Error('move action requires arrays');
      }

      const from = [...action.from];
      const to = [...action.to];

      // to and from become the path of their respective parent nodes
      const fromIndex = Number.parseInt(from.pop());
      const toIndex = Number.parseInt(to.pop());

      // `fromParent` and `toParent` should reference the same array
      // if the element is only moved within an array, otherwise the
      // element will be removed from the fromParent array, but the
      // change won't be reflected in the toParent array and thus not
      // in `nstate`.
      //
      // In other words, don't do this:
      // const fromParent = [...get(nstate, from)];
      // const toParent = [...get(nstate, to)];
      const fromParent = get(tree, from);
      const toParent = get(tree, to);

      const element = fromParent.splice(fromIndex, 1)[0];

      if (typeof element === 'undefined') {
        throw new Error("element doesn't exist");
      }

      toParent.splice(toIndex, 0, element);

      set(tree, from, fromParent);
      set(tree, to, toParent);

      return tree;
    }

    default:
      throw new Error('Invalid action');
  }
};

export default reducer;
