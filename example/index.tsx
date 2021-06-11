import React from 'react';
import ReactDOM from 'react-dom';

import CMS, { createConfig } from '../src';
import config from './config';

const DUMMY_TREE = {
  type: 'component/page',
  content: {
    children: [
      {
        type: 'component/heading',
        content: { children: ['Welcome to the tutorial'] },
      },
      {
        type: 'component/image',
        content: { src: 'https://i.imgur.com/fGjBzsD.jpeg' },
      },
      {
        type: 'component/text',
        content: {
          children: [
            '<h2>Om djedi</h2> <p>Djedi är ett datorprogram för editering av hemsidor. Som MS Word fast för webben</p> <a href="http://www.microsoft.com">Till Microsofts hjälpsidor</a>',
          ],
        },
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
          image: 'https://placekitten.com/200/200',
          text: 'Interesting facts about CSS',
          color: 'grey',
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
