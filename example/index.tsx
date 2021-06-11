import React from 'react';
import ReactDOM from 'react-dom';

import { NodeTreeItem } from 'types';
import CMS, { createConfig } from '../src';
import config from './config';

const DUMMY_TREE: NodeTreeItem = {
  type: 'component/page',
  content: {
    children: [
      {
        type: 'component/heading',
        content: { children: 'Welcome to the tutorial' },
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
          text: 'Interesting facts about CSS',
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

const init = () => {
  // collect roots
  const root = document.querySelector('#root');

  // init wizard
  if (root) {
    ReactDOM.render(
      <React.StrictMode>
        <CMS config={createConfig(config)} tree={DUMMY_TREE} />
      </React.StrictMode>,
      root
    );
  }
};

init();
