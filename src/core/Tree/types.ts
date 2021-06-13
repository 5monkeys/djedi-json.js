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
