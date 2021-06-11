import React from 'react';

import { Config, NodeTreeItem } from 'types';

export interface RendererProps {
  tree?: NodeTreeItem;
  config: Config;
}

const Renderer: React.FC<RendererProps> = ({ config, tree }) => {
  if (tree === undefined || !Array.isArray(tree)) {
    return null;
  }

  return (
    <>
      {tree.map(item => {
        const { components } = config;

        // find the config for this component
        const Config = components.find(c => c.type === item.type);

        // No type found. This is not a component.
        if (!Config) {
          return null;
        }

        const { children, ...props } = item.content;

        // This item has no children. Render as is.
        return (
          <Config.Component {...props} data-uri={item.uri} key={item.uri}>
            <Renderer tree={children} config={config} />
          </Config.Component>
        );
      })}
    </>
  );
};

export default Renderer;
