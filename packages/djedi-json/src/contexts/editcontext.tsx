import React, { RefObject } from 'react';
import { Path } from '../core/Tree/types';
import { ComponentConfig, NodeContentType, NodeTreeItem } from '../types';

export type EditContextType = {
  /** Ref of the outermost element of the rendered component. */
  ref: RefObject<HTMLSpanElement> | null;

  /** The path to this component in the entirte tree. */
  path: string[];

  /** The type of this component. */
  config: ComponentConfig;

  /** The type of the parent of this component, `null` if at root. */
  parentType: NodeTreeItem['type'] | null;

  /** The local sub-tree for this component. */
  tree: NodeTreeItem;

  /** Append a new component at the end of the current tree/arry of children. */
  append: (type: NodeTreeItem['type'], content?: Record<string, any>) => void;

  /**
   * Insert a new component in an arbitrary `index` along its siblings.
   * Defaults to the `index` below the inserting component.
   */
  insert: (
    type: NodeTreeItem['type'],
    opts: { index?: number; content?: Record<string, any> }
  ) => void;

  /** Remove the current component from the tree. */
  remove: () => void;

  /** Patch the current tree with new content. */
  patch: (content: NodeContentType) => void;

  /** Set `editing`. */
  setEdit: (isEditing: boolean) => void;

  /**
   * Whether the current component is being edited.
   * Can be repurposed if `editable: false` or `isomorphic: true` in the component config.
   */
  editing: boolean;

  /** Shift the current component up or down in the tree. */
  shift: (steps: number) => void;

  /** Move the current component to a new location in the tree. */
  move: (to: Path) => void;
};

const EditContext = React.createContext<EditContextType>({
  ref: null,
  editing: false,
  tree: { content: {}, type: 'unknown' },
  setEdit: () => {
    // not empty
  },
  append: () => {
    // not, empty
  },
  insert: () => {
    // not empty
  },
  remove: () => {
    // not empty
  },
  patch: () => {
    // not empty
  },
  path: [],
  config: null,
  parentType: '',
  shift: () => {
    // not empty
  },
  move: () => {
    // not empty
  },
});

export const useEdit = () => React.useContext(EditContext);

export default EditContext;
