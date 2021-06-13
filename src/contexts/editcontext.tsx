import React, { RefObject } from 'react';

export type EditContextType = {
  ref: RefObject<HTMLSpanElement> | null;
  path: string[];
  tree: NodeTreeItem;
  append: (t: string) => void;
  remove: () => void;
  patch: (p: NodeContentType) => void;
  setEdit: (v: boolean) => void;
  editing: boolean;
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
});

export const useEdit = () => React.useContext(EditContext);
export default EditContext;
