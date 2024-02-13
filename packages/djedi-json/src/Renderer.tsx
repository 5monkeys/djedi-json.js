import React from 'react';
import { Config, LeanConfig, NodeTreeItem } from './types';

export interface RendererProps {
  tree?: NodeTreeItem;
  config: LeanConfig | Config;
}

const Renderer: React.FC<RendererProps> = ({ config, tree }) => {
  if (tree == null) return null;

  const { components } = config;

  /** Find the config for this component. */
  const Config = React.useMemo(() => {
    return components.find(({ type }) => type === tree.type);
  }, [components, tree.type]);

  // No type found. This is not a component.
  if (!Config) return null;

  const { children, ...props } = tree.content;

  const renderedChildren = React.useMemo(() => {
    if (Array.isArray(children)) {
      return children.map((t: NodeTreeItem, i: number) => (
        <Renderer key={i} tree={t} config={config} />
      ));
    } else return children;
  }, [children, config]);

  return (
    <Config.Component {...props} data-uri={tree.uri}>
      {renderedChildren}
    </Config.Component>
  );
};

export default React.memo(Renderer);
