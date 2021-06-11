import { useCMS } from 'contexts/cms';
import Editable from 'core/Editable';
import { NodeTreeItem } from 'types';

/**
 *
 * @param config Config to use for resolving the components to be rendered
 * @param tree a NodeTree to be walked
 * @param edit boolean - if true wraps the target component in an Edit-component.
 * @returns a rendered tree of components
 */

const EditorTree: React.FC<{ tree: NodeTreeItem; path?: string[] }> = ({ tree, path = [] }) => {
  const { config } = useCMS();
  const { components } = config;

  // find the config for this component
  const Config = components.find(c => c.type === tree.type);

  if (!Config) {
    return null;
  }
  // const [childKey] = Object.entries(Config.content).find(([, t]) => t.type == 'input/children');

  const { children } = tree.content;
  // const localPath = [...path, index.toString(), 'content', 'children'];

  return (
    <Editable config={Config} tree={tree} path={path}>
      {Array.isArray(children) &&
        children?.map((child, i) => (
          <EditorTree tree={child} key={i} path={[...path, 'content', 'children', i.toString()]} />
        ))}
    </Editable>
  );

  // This tree has no children. Render as is.

  // return <Editable config={Config} data={item.content} key={index} path={path} index={index} />;
};

export default EditorTree;
