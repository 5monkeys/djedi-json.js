import { CMSType } from '../src';
import { ComponentConfig } from '../src/types';
import { createConfig } from '../src/utils';
import CaptionedImage from './components/CaptionedImage';
import Grid from './components/Grid';
import Heading from './components/Heading';
import Hero from './components/Hero';
import Page from './components/Page';
import Unsplash, { TYPE_IDENTIFIER as UNSPLASHED_TYPE, UnsplashedImage } from './edits/Unsplashed';

const components: ComponentConfig[] = [
  {
    title: 'Page',
    Component: Page,
    description: 'Page component',
    type: 'component/page',
    content: {
      children: CMSType.children({ label: 'contents', self: false }),
      title: CMSType.string(),
      meta: CMSType.string(),
      sub: CMSType.string(),
    },
  },
  {
    title: 'Heading',
    Component: Heading,
    description: 'A big heading component',
    type: 'component/heading',
    content: CMSType.custom({ isomorphic: true }),
  },
  {
    title: 'Captioned image',
    description: 'A figure element with a caption',
    Component: CaptionedImage,
    type: 'component/caption-image',
    editOnClick: true,
    content: {
      text: CMSType.string({ label: 'description' }),
      background: CMSType.select({ options: ['black', 'grey', 'white'] }),
    },
  },
  {
    title: 'Hero',
    Component: Hero,
    type: 'component/hero',
    content: {
      text: CMSType.string({ label: 'Hero text' }),
      image: UnsplashedImage(),
    },
  },
  {
    title: 'Grid',
    Component: Grid,
    type: 'component/grid',
    content: {
      children: CMSType.children({ self: false, allowed: ['component/caption-image'] }),
    },
  },
];

const config = createConfig({
  components,
  edit: {
    [UNSPLASHED_TYPE]: {
      Component: Unsplash,
    },
  },
});

export default config;
