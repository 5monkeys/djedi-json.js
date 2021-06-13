import React from 'react';

import { useCMS } from '../../contexts/cms';
import EditorTree from './EditorTree';
import IsolateStyles from './IsolateStyles';

const Preview: React.FC = () => {
  const { tree } = useCMS();

  return <IsolateStyles>{tree && <EditorTree tree={tree} />}</IsolateStyles>;
};

export default Preview;
