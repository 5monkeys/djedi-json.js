import React from 'react';

import CMSContext from 'contexts/cms';
import Preview from 'core/Renderer/Preview';
import { treeReducer } from 'core/Tree';
import { Config, NodeTreeItem } from 'types';

export interface CMSProps {
  config: Config;
  tree?: NodeTreeItem;
  onChange?: (t: NodeTreeItem) => void;
  onSave?: (t: NodeTreeItem) => void;
}

const CMS: React.FC<CMSProps> = ({
  tree: passedTree = [],
  config: passedConfig,
  onChange,
  onSave,
}) => {
  const [tree, setTree] = React.useReducer(treeReducer, passedTree);
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
      <Preview />
    </CMSContext.Provider>
  );
};

export default CMS;
