import { CMSType, createConfig } from 'djedi-json';

import CaptionedImage from './components/CaptionedImage';
import Grid from './components/Grid';
import Heading from './components/Heading';
import Hero from './components/Hero';
import Page from './components/Page';
import Paragraph from './components/Paragraph';
import Unsplash, { TYPE_IDENTIFIER as UNSPLASHED_TYPE, UnsplashedImage } from './edits/Unsplashed';

const components: ComponentConfig[] = [
  {
    title: 'Page',
    Component: Page,
    description: 'Page component',
    type: 'component/page',
    removable: false,
    content: {
      children: CMSType.children({ label: 'contents', self: false }),
      title: CMSType.string({ label: 'Meta Title of the page' }),
      meta: CMSType.string({ label: 'Meta description' }),
      sub: CMSType.string({ label: 'Subtitle' }),
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
    icon: <div>RC</div>,
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
    icon: '🦸🏽‍♀️',
    content: {
      text: CMSType.string(),
      image: UnsplashedImage(),
    },
  },
  {
    title: 'Grid',
    Component: Grid,
    type: 'component/grid',
    editable: false,
    content: CMSType.custom({
      isomorphic: true,
      children: CMSType.children({ self: false, allowed: ['component/caption-image'] }),
    }),
  },
  {
    title: 'Paragraph',
    Component: Paragraph,
    type: 'component/paragraph',
    editOnClick: true,
    content: {
      text: CMSType.string(),
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
