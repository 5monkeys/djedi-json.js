import { CMS, createConfig, Preview } from 'djedi-json';

import config from './config';

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

const c = createConfig(config);

function App() {
  return (
    <div className="App">
      <CMS config={c} tree={DUMMY_TREE}>
        <Preview />
      </CMS>
    </div>
  );
}

export default App;
