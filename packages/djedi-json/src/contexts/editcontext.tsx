import React, { RefObject } from 'react';
import { NodeContentType, NodeTreeItem } from '../types';

export type EditContextType = {
  ref: RefObject<HTMLSpanElement> | null;
  path: string[];
  tree: NodeTreeItem;
  append: (t: string, o?: Record<string, any>) => void;
  remove: () => void;
  patch: (p: NodeContentType) => void;
  setEdit: (v: boolean) => void;
  editing: boolean;
  move: (steps: number) => void;
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
  remove: () => {
    // not empty
  },
  patch: () => {
    // not empty
  },
  path: [],
  move: () => {
    // not empty
  },
});

export const useEdit = () => React.useContext(EditContext);
export default EditContext;
