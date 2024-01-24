import React, { ReactNode } from 'react';

import { useCMS } from '../../contexts/cms';
import { NodeTreeItem } from '../../types';
import Editable from '../Editable';

/**
 *
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
    return components.find(c => c.type === tree.type);
  }, [components, tree]);

  if (!Config) {
    return null;
  }

  const { children } = tree.content;

  return (
    <Editable config={Config} tree={tree} path={path}>
      {Array.isArray(children) &&
        children?.map((child, i) => {
          const k = [...path, 'content', 'children', i.toString()];
          return <EditorTree tree={child} key={k.join('.')} path={k} />;
        })}
    </Editable>
  );

  // This tree has no children. Render as is.

  // return <Editable config={Config} data={item.content} key={index} path={path} index={index} />;
};

export default EditorTree;
