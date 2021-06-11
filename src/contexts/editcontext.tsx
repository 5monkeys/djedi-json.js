import React, { RefObject } from 'react';

export type EditContextType = {
  ref: RefObject<HTMLSpanElement> | null;
  path: string[];
  data: Record<string, any>;
  patch: (p: Record<string, any>) => void;
  setEditing: (v: boolean) => void;
  editing: boolean;
};

const EditContext = React.createContext<EditContextType>({
  ref: null,
  data: {},
  setEditing: () => {
    // not set
  },
  editing: false,
  patch: () => {
    // not set
  },
  path: [],
});

export const useEdit = () => React.useContext(EditContext);
export default EditContext;
