import React from 'react';

import { TreeReducerAction } from 'core/Tree';
import { Config, NodeTreeItem } from 'types';
import { createConfig } from '../utils';

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
