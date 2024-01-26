import React, { ReactNode } from 'react';

import CMSContext from '../../contexts/cms';
import { Config, NodeTreeItem } from '../../types';
import { createEmpty } from '../Node';
import { reducer } from '../Tree';
import { addRefsToTree } from '../Tree/utils';

export interface CMSProps {
  config: Config;
  tree?: NodeTreeItem;
  children?: ReactNode;
}

const stringifyDeepEqual = <T,>(stringified: string, o: T) => stringified === JSON.stringify(o);

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
  const [tree, setTree] = React.useReducer(reducer, passedTree, addRefsToTree);
  const [config, setConfig] = React.useState<Config>(passedConfig);

  const initialTree = React.useMemo(() => JSON.stringify(passedTree), [passedTree]);
  const dirty = React.useMemo(() => !stringifyDeepEqual(initialTree, tree), [initialTree, tree]);

  // Keep the tree in sync.
  React.useEffect(() => setTree({ type: 'replace', payload: passedTree }), [passedTree]);

  // Keep the config in sync.
  React.useEffect(() => setConfig(passedConfig), [passedConfig]);

  return (
    <CMSContext.Provider value={{ config, dirty, tree, setTree }}>{children}</CMSContext.Provider>
  );
};

export default CMS;
