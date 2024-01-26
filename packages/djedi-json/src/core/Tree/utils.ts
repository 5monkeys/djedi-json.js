import { NodeTreeItem } from '../../types';

/** Clean the tree from faulty nodes. */
export const cleanTree = (node: NodeTreeItem): NodeTreeItem => {
  return Array.isArray(node.content?.children)
    ? {
        ...node,
        content: {
          ...node.content,
          children: node.content?.children.filter(Boolean).map(cleanTree),
        },
      }
    : node;
};

/** Clean the tree from faulty nodes. */
export const addRefsToTree = (node: NodeTreeItem): NodeTreeItem => {
  if (!node.__ref) node.__ref = crypto.randomUUID();

  return Array.isArray(node.content?.children)
    ? {
        ...node,
        content: {
          ...node.content,
          children: node.content?.children.map(addRefsToTree),
        },
      }
    : node;
};
