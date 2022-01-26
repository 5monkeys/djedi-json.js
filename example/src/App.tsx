import { useState } from 'react';
import { CMS, createConfig, Preview } from 'djedi-json';

import config from './config';

const c = createConfig(config);
const DUMMY_TREE: NodeTreeItem = {
  type: 'component/page',
  content: {
    title: 'Example page',
    meta: 'Meta title',
    sub: 'This is a pluggable component admin',
    children: [
      {
        type: 'component/heading',
        content: { children: 'This heading is directly editable' },
      },
      {
        type: 'component/caption-image',
        content: {
          text: 'Interesting facts about cats',
          background: 'black',
        },
      },
      {
        type: 'component/container',
        content: {},
      },
    ],
  },
};

function App() {
  const [state] = useState(DUMMY_TREE);
  return (
    <div className="App">
      <CMS config={c} tree={state}>
        <Preview />
      </CMS>
    </div>
  );
}

export default App;
