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
        type: 'component/heading',
        content: { children: 'This' },
      },
      {
        type: 'component/heading',
        content: { children: 'heading is' },
      },
      {
        type: 'component/heading',
        content: { children: 'directly editable' },
      },
      {
        type: 'component/paragraph',
        content: {
          children:
            'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio facilis vel consectetur dolore fugit enim nam ratione culpa numquam corporis eum debitis, incidunt sint saepe modi? Maxime explicabo cupiditate nobis.',
        },
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
