import React, { ReactNode } from 'react';

import CMSContext from '../../contexts/cms';
import { Config, NodeTreeItem } from '../../types';
import { createEmpty } from '../Node';
import { reducer } from '../Tree';
import * as Tree from '../Tree/utils';

export interface CMSProps {
  config: Config;
  tree?: NodeTreeItem;
  children?: ReactNode;
}

/**
 * Check if the tree has changed using stringified compare.
 */
const treeHasChanged = (stringified: string, tree: NodeTreeItem) => {
  return stringified !== JSON.stringify(Tree.onlyContent(tree));
};

/**
 * The root of the CMS and the node tree.
 * Provides the CMSContext to all children, accessed with `useCMS`.
 * There should only be one CMS component in the tree.
 */
const CMS: React.FC<CMSProps> = ({
  tree: passedTree = createEmpty(''),
  config: passedConfig,
  children,
}) => {
  const [tree, setTree] = React.useReducer(reducer, passedTree, Tree.addRefs);
  const [config, setConfig] = React.useState<Config>(passedConfig);

  /** Used to check if the tree has changed. Stringified to make dirty checks a bit faster. */
  const initialTree = React.useMemo(() => {
    return JSON.stringify(Tree.onlyContent(passedTree));
  }, [passedTree]);

  const dirty = React.useMemo(() => treeHasChanged(initialTree, tree), [initialTree, tree]);

  // Keep the tree in sync.
  React.useEffect(() => setTree({ type: 'replace', payload: passedTree }), [passedTree]);

  // Keep the config in sync.
  React.useEffect(() => setConfig(passedConfig), [passedConfig]);

  const value = React.useMemo(() => ({ config, dirty, tree, setTree }), [config, dirty, tree]);

  return <CMSContext.Provider value={value}>{children}</CMSContext.Provider>;
};

export default CMS;
