import { CMS, createConfig } from 'djedi-json';

import config from './config';

const DUMMY_TREE = {
  type: 'component/page',
  content: {
    children: [
      {
        type: 'component/heading',
        content: { children: 'This heading is directly editable' },
      },
      {
        type: 'component/container',
        content: {
          children: [{ type: 'component/heading', content: { children: 'hallå där' } }],
        },
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
  return (
    <div className="App">
      <CMS config={createConfig(config)} tree={DUMMY_TREE} />
    </div>
  );
}

export default App;
