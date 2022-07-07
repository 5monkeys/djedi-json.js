import React from 'react';

export interface RendererProps {
  tree?: NodeTreeItem;
  config: LeanConfig | Config;
}

const Renderer: React.FC<RendererProps> = ({ config, tree }) => {
  if (tree === undefined) {
    return null;
  }
  const { components } = config;

  // find the config for this component
  const Config = components.find(c => c.type === tree.type);

  // No type found. This is not a component.
  if (!Config) {
    return null;
  }

  const { children, ...props } = tree.content;

  return (
    <Config.Component {...props} data-uri={tree.uri}>
      {Array.isArray(children)
        ? children.map((t: NodeTreeItem, i: number) => (
            <Renderer key={i} tree={t} config={config} />
          ))
        : children}
    </Config.Component>
  );
};

export default Renderer;
