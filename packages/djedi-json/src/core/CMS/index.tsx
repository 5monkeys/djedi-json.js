import React, { ReactNode } from 'react';

import CMSContext from '../../contexts/cms';
import { Config, NodeTreeItem } from '../../types';
import { createEmpty } from '../Node';
import { reducer } from '../Tree';
import { lossyDeepClone } from '../Tree/utils';

export interface CMSProps {
  config: Config;
  tree?: NodeTreeItem;
  children?: ReactNode;
}

const stringifyDeepEqual = <T,>(a: string, b: T) => a === JSON.stringify(b);

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
  const [tree, setTree] = React.useReducer(reducer, passedTree);
  const [config, setConfig] = React.useState<Config>(passedConfig);

  const initialTree = React.useMemo(() => JSON.stringify(passedTree), [passedTree]);
  const dirty = React.useMemo(() => !stringifyDeepEqual(initialTree, tree), [initialTree, tree]);

  // keep tree in sync
  React.useEffect(
    // deep cloning the tree here ensures there's no issues with mutating the passed in object further down the tree.
    () => setTree({ type: 'replace', payload: lossyDeepClone(passedTree) }),
    [passedTree]
  );

  // keep config in sync
  React.useEffect(() => setConfig(passedConfig), [passedConfig]);

  return (
    <CMSContext.Provider value={{ config, dirty, tree, setTree }}>{children}</CMSContext.Provider>
  );
};

export default CMS;
