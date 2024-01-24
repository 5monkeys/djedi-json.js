import React from 'react';

import { createConfig } from '../core/config';
import { TreeReducerAction } from '../core/Tree/types';
import { Config, NodeTreeItem } from '../types';

export type CMSContextType = {
  config: Config;
  dirty: boolean;
  tree?: NodeTreeItem;
  setTree: (r: TreeReducerAction) => void;
};

const CMSContext = React.createContext<CMSContextType>({
  config: createConfig({}),
  /** If the tree has been modified */
  dirty: false,
  tree: undefined,
  setTree: () => {
    // not initiated
  },
});

export const useCMS = () => React.useContext(CMSContext);
export default CMSContext;
