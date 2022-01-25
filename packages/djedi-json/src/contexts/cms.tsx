import React from 'react';

import { createConfig } from '../core/config';
import { TreeReducerAction } from '../core/Tree/types';

export type CMSContextType = {
  config: Config;
  tree?: NodeTreeItem;
  saveTree: () => void;
  setTree: (r: TreeReducerAction) => void;
};

const CMSContext = React.createContext<CMSContextType>({
  config: createConfig({}),
  tree: undefined,
  saveTree: () => {
    // not initiated
  },
  setTree: () => {
    // not initiated
  },
});

export const useCMS = () => React.useContext(CMSContext);
export default CMSContext;
