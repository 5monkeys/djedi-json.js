import React from 'react';

import { useCMS } from '../../contexts/cms';
import EditorTree from './EditorTree';

const Preview: React.FC = () => {
  const { tree } = useCMS();
  return tree ? <EditorTree tree={tree} /> : null;
};

export default React.memo(Preview);
