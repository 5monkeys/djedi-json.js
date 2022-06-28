import { get, set, unset } from 'lodash-es';

import { createEmpty } from '../Node';
import { TreeReducerAction } from './types';
import { cleanTree } from './utils';

export const reducer = (state: NodeTreeItem, action: TreeReducerAction) => {
  console.log("Reducer ran with action '%s'", action.type);
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
        const path = action.path.slice();

        const starting_index = parseInt(path.pop());
        if (!Number.isNaN(starting_index)) {
          debugger;
          console.debug('%d is valid number', starting_index);
          // // Calculate the desired index
          // const desired_index = Math.min(
          //   Math.max(starting_index + action.direction, 0),
          //   get(nstate, path, []).length
          // );
          // const raw_children: [] = get(nstate, path, []);
          // // Remove the element we want to move
          // const children = raw_children
          //   .slice(0, starting_index)
          //   .concat(raw_children.slice(starting_index + 1));
          // // Get every child before and after the desired index to make the insert
          // const before = children.slice(0, desired_index);
          // const after = children.slice(desired_index);
          // const to_move = get(nstate, action.path, []);
          // // console.trace();
          // // Create the new children
          // const new_children = [...before, to_move, ...after];
          // // Set the new children
          // set(nstate, path, [...new_children]);
        }
      }

      console.info('Running move.');

      return nstate;
    }

    default:
      throw new Error('Invalid action');
  }
};

export default reducer;
