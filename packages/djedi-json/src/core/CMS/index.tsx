import React from 'react';

import CMSContext from '../../contexts/cms';
import { createEmpty } from '../Node';
import { reducer } from '../Tree';

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
  React.useEffect(() => setTree({ type: 'replace', payload: passedTree }), [passedTree]);

  // keep config in sync
  React.useEffect(() => setConfig(passedConfig), [passedConfig]);

  return <CMSContext.Provider value={{ config, tree, setTree }}>{children}</CMSContext.Provider>;
};

export default CMS;
