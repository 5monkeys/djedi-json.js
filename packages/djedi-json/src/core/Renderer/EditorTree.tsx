import React, { ReactNode } from 'react';

import { useCMS } from '../../contexts/cms';
import { NodeTreeItem } from '../../types';
import Editable from '../Editable';

/**
 * Renders a tree of components.
 * @param config Config to use for resolving the components to be rendered
 * @param tree a NodeTree to be walked
 * @param edit boolean - if true wraps the target component in an Edit-component.
 * @returns a rendered tree of components
 */
const EditorTree: React.FC<{ tree: NodeTreeItem; path?: string[]; children?: ReactNode }> = ({
  tree,
  path = [],
}) => {
  const { config } = useCMS();
  const { components } = config;

  // find the config for this component
  const Config = React.useMemo(() => {
    return components.find(({ type }) => type === tree.type);
  }, [components, tree]);

  if (!Config) return null;

  const { children } = tree.content;

  const renderedChildren = React.useMemo(() => {
    if (Array.isArray(children)) {
      return children?.map((child, i) => {
        const childPath = [...path, 'content', 'children', String(i)];
        return <EditorTree tree={child} key={child.__ref} path={childPath} />;
      });
    }
  }, [children, path]);

  return (
    <Editable config={Config} tree={tree} path={path}>
      {renderedChildren}
    </Editable>
  );
};

export default React.memo(EditorTree);
