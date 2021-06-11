import CMSType from '../src/CMSType';
import { ComponentConfig } from '../src/types';
import { createConfig } from '../src/utils';
import CaptionedImage from './components/CaptionedImage';
import Grid from './components/Grid';
import Heading from './components/Heading';
import Hero from './components/Hero';
import Page from './components/Page';
import InteractiveString, {
  interactive,
  TYPE_IDENTIFIER as InteractiveStringType,
} from './edits/InteractiveString';

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
    type: 'input/heading',
    content: interactive({ isomorphic: true }),
  },
  {
    title: 'Captioned image',
    description: 'A figure element with a caption',
    Component: CaptionedImage,
    type: 'component/caption-image',
    content: {
      image: CMSType.image(),
      text: CMSType.string({ label: 'description' }),
      background: CMSType.select({ options: ['black', 'grey', 'white'] }),
    },
  },
  {
    title: 'Hero',
    Component: Hero,
    type: 'component/hero',
    content: {
      image: CMSType.image({ label: 'Hero background' }),
      text: CMSType.string({ label: 'Hero text' }),
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
});

export default config;
