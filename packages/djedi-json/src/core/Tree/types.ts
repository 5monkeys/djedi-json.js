export type Path = string[] | string;

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
  path: Path;
};

export type AddAction = {
  type: 'add';
  payload: NodeTreeItem;
  path: Path;
};

export type DeleteAction = {
  type: 'delete';
  path: Path;
};

export type MoveAction = {
  type: 'move';
  path: Path;
  steps: number;
};

export type TreeReducerAction =
  | MoveAction
  | ReplaceAction
  | EmptyAction
  | PatchAction
  | DeleteAction
  | AddAction;
