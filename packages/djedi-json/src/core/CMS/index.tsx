import React from 'react';

import CMSContext from '../../contexts/cms';
import { createEmpty } from '../Node';
import { reducer } from '../Tree';

export interface CMSProps {
  config: Config;
  tree?: NodeTreeItem;
  onChange?: (t: NodeTreeItem) => void;
  onSave?: (t: NodeTreeItem) => void;
}

/**
 * 
 TODO
 * Add nice error messages for config faults
 */
const CMS: React.FC<CMSProps> = ({
  tree: passedTree = createEmpty(''),
  config: passedConfig,
  onChange,
  onSave,
  children,
}) => {
  const [tree, setTree] = React.useReducer(reducer, passedTree);
  const [config, setConfig] = React.useState<Config>(passedConfig);

  React.useEffect(() => {
    onChange && onChange(tree);
  }, [tree, onChange]);

  // Save functionality to interface with components outside of the CMS.
  const saveTree = () => onSave && onSave(tree);

  // keep tree in sync
  React.useEffect(() => setTree({ type: 'replace', payload: passedTree }), [passedTree]);

  // keep config in sync
  React.useEffect(() => setConfig(passedConfig), [passedConfig]);

  return (
    <CMSContext.Provider value={{ config, tree, setTree, saveTree }}>
      {children}
    </CMSContext.Provider>
  );
};

export default CMS;
