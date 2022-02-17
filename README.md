# Djedi - JSON

A easy way to create micro-admins using react components, saving the output
as a JSON to be consumed in frontend.

[Documentation](#Documentation)

[Develop this package!](#Development)

### installing

```
npm install -S djedi-json react react-dom
```

# Djedi pages frontend


# Documentation
## Using the CMS in an admin.

The CMS has two main components,  a Preview, displaying the results/editable parts of your CMS. This has to be wrapped in `CMS` to work. `CMS` is basically a ContextProvider, allowing you to append your own children that consume `CMSContext`.

CMS needs just a `config` to work, but if you want to continue on a previously saved document this is passed as `tree`.
```
import { CMS, createConfig, Preview } from 'djedi-json';

const App = () => (
  <CMS config={} tree={}>
    <Preview />
  </CMS>)
```
## Consuming data created by the admin in a frontend:

```
import { Renderer } from 'djedi-json';

// Map the types to the Components you want to display.
const config = {
  components: [
    { Component: Page, type: "component/page" },
    { Component: RichText, type: "component/rich-text" },
    { Component: Image, type: "component/image" },
    { Component: Article, type: "component/article" },
  ],
};

const tree = {
  type: 'component/page',
  content: {
    title: 'Example page',
    meta: 'Meta title',
    sub: 'This is a pluggable component admin',
    children: [
      {
        type: 'component/rich-text',
        content: { children: 'I am a a header' },
      },
      {
        type: 'component/image',
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
}

// The Renderer recursively walks the tree, rendering the components from config with the props from `content` in each TreeNode
const Page = () => {
  return <Renderer tree={tree} config={config} />;
};
```

## The config
Create a config using the `createConfig` util.
```
import { createConfig } from 'djedi-json'

const config = createConfig({
  components: [
    {
    title: 'Page', // Displayname
    description: 'Page component', // Description
    icon: <SvgIcon/>, // A ReactComponent to be used as icon
    Component: Page, // The component itself
    type: 'component/page', // This is used to find the component used for rendering on the site.
    removable: false, // toggle the default remove-button for this element,
    edit: true, // toggle the default edit-button for this element,
    editOnClick: true, // Opens the edit menu if the element is clicked on anywhere, not just the edit-button,
    // The content maps to the component props of the Page component using CMSType:s.
    content: { 
      children: CMSType.children({ label: 'contents', self: false }),
      title: CMSType.string({ label: 'Meta Title of the page' }),
      meta: CMSType.string({ label: 'Meta description' }),
      sub: CMSType.string({ label: 'Subtitle' }),
    },
  }
  ],
  // Edits are used to register custom components for editing our own types 
  edit: {
    "image": { // Type-key
      Component: Unsplash, // ReactComponent
    },
  },
});
```

### CMSTypes
There are four CMSTypes included from the start:

- CMSType.children
- CMSType.string
- CMSType.select
- CMSType.custom

#### CMSType/Children

Children dictates how and if items can be appended to the item. The settings available are:
```
append: boolean // Can this item have children appended, ie should the plus-button be rendered ?
self: boolean // The item can accept it's own type as a child
allowed: string[] // List of types that can be appended, these are available through the append-button rendered if append=truee
````

#### CMSType/String

plain string

#### CMSType/Select

#### CMSType/Custom

options, can be either a list of strings or an object with `label`and `value` keys.

#### Registering custom edits

All custom edits needs to accept at least `value` and `onChange` as props, handling the two-way-binding,

  edit: {
    "image": { // Type-key
      Component: Unsplash, // ReactComponent
    },
  },

## Components

## Contexts

`EditContext`
Used to access edit functions on the current component. Each component is rendered within a separate EditContext.

`CMSContext`
Used to access the currnt root tree of the CMS.


## Development

Within this repo is an example Create-react-app that has a link into the folder above, being the admin.

Get started:

```
npm ci:all; // install dependencies for example app and djedi-json

Run npm start in both the example app and the packages/djedi-json
```

## Publishing to NPM
```
npm run publish:core
```
