import { get, set, unset } from 'lodash';

import { NodeTreeItem } from 'types';
import { cleanTree, createEmpty } from '../utils';

export type ReplaceAction = {
  type: 'replace';
  payload: NodeTreeItem;
};

export type EmptyAction = {
  type: 'empty';
};

export type PatchAction = {
  type: 'patch';
  payload: NodeTreeItem;
  path: string[];
};

export type AddAction = {
  type: 'add';
  payload: NodeTreeItem;
  path: string[];
};

export type DeleteAction = {
  type: 'delete';
  path: string[];
};

export type TreeReducerAction =
  | ReplaceAction
  | EmptyAction
  | PatchAction
  | DeleteAction
  | AddAction;

export const treeReducer = (state: NodeTreeItem, action: TreeReducerAction) => {
  switch (action.type) {
    case 'replace':
      return action.payload;
    case 'empty':
      return createEmpty('');
    case 'add': {
      // scope
      const nstate = { ...state };
      const parent = get(nstate, action.path, []);

      if (Array.isArray(parent.children)) {
        // if the return is an array, push to it ...
        parent.children.push(action.payload);
      } else {
        //... Otherwise create an array where applicable.
        parent.children = [action.payload];
      }
      set(nstate, action.path, parent ? [...parent, action.payload] : [action.payload]);

      return nstate;
    }
    case 'patch': {
      // scope
      const nstate = { ...state };
      set(nstate, action.path, action.payload);
      return nstate;
    }
    case 'delete': {
      // scope
      const nstate = { ...state };
      unset(nstate, action.path);

      return cleanTree(nstate);
    }
    default:
      throw new Error('Invalid action');
  }
};
