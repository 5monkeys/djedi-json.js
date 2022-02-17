import React from 'react';

import CMSContext from '../../contexts/cms';
import { createEmpty } from '../Node';
import { reducer } from '../Tree';
import { lossyDeepClone } from '../Tree/utils';

export interface CMSProps {
  config: Config;
  tree?: NodeTreeItem;
}

/**
 * 
 TODO
 * Add nice error messages for config faults
 */
const CMS: React.FC<CMSProps> = ({
  tree: passedTree = createEmpty(''),
  config: passedConfig,
  children,
}) => {
  const [tree, setTree] = React.useReducer(reducer, passedTree);
  const [config, setConfig] = React.useState<Config>(passedConfig);

  // keep tree in sync
  React.useEffect(
    // deep cloning the tree here ensures there's no issues with mutating the passed in object further down the tree.
    () => setTree({ type: 'replace', payload: lossyDeepClone(passedTree) }),
    [passedTree]
  );

  // keep config in sync
  React.useEffect(() => setConfig(passedConfig), [passedConfig]);

  return <CMSContext.Provider value={{ config, tree, setTree }}>{children}</CMSContext.Provider>;
};

export default CMS;
