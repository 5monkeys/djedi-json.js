import React from 'react';

import { createConfig } from '../core/config';
import { TreeReducerAction } from '../core/Tree/types';
import { Config, NodeTreeItem } from '../types';

export type CMSContextType = {
  /** Entire CMS configuration, includes all child components. */
  config: Config;

  /** If the tree has been modified. */
  dirty: boolean;

  /** The tree of nodes. */
  tree?: NodeTreeItem;

  /**
   * Reducer dispatch, changes the tree of nodes.
   * When possible, prefer node-local actions from `useEdit`.
   */
  setTree: (r: TreeReducerAction) => void;
};

const CMSContext = React.createContext<CMSContextType>({
  config: createConfig({}),
  dirty: false,
  tree: undefined,
  setTree: () => {
    // not initiated
  },
});

export const useCMS = () => React.useContext(CMSContext);

export default CMSContext;
