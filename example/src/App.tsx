import { useState } from 'react';
import { CMS, createConfig, NodeTreeItem, Preview } from 'djedi-json';

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
            'Cillum esse incididunt exercitation fugiat pariatur exercitation qui. Nulla proident velit et culpa ullamco esse occaecat eu dolor labore. Proident voluptate esse minim laborum ea nulla ex culpa mollit ea magna tempor tempor. Ad laborum pariatur tempor ipsum commodo sunt commodo aliquip laborum esse quis minim sint. Minim ea est aliquip et magna reprehenderit in sit aute. Culpa fugiat et commodo aliqua tempor ipsum do.',
        },
      },
      {
        type: 'component/paragraph',
        content: {
          children:
            'Nulla magna laboris aliquip minim ut duis enim incididunt. Adipisicing amet irure ad non consequat. Voluptate id nulla et nulla sint et mollit in adipisicing duis. Adipisicing excepteur culpa minim occaecat laboris labore aliquip incididunt irure aliqua laboris cupidatat sit sit. Qui Lorem mollit irure proident occaecat proident. Consequat exercitation adipisicing sint consequat ad fugiat aliqua aute officia. Proident laborum deserunt magna aliqua laborum veniam anim ipsum.',
        },
      },
      {
        type: 'component/paragraph',
        content: {
          children:
            'Excepteur nostrud velit qui elit nulla incididunt duis nostrud velit id ad laborum. Magna minim est excepteur excepteur deserunt eu amet. Minim sunt ex nostrud est pariatur. Incididunt occaecat officia minim consequat incididunt qui irure ad cupidatat esse duis esse. Adipisicing cupidatat irure nulla exercitation veniam nisi anim occaecat. Laborum nostrud eiusmod aliqua reprehenderit occaecat Lorem sunt minim anim incididunt ad duis est voluptate.',
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
