import { NodeTreeItem } from '../../types';

/**
 * Returns a new object containing only the specified keys and their corresponding values from the input object.
 *
 * @param {T} object - An object containing properties that may or may not be included in the resulting object.
 * @param {K[]} keys - An array of strings representing the keys of the properties in the input object that should be included in the resulting object.
 */
const pick = <T, K extends keyof T>(object: T, ...keys: K[]): Pick<T, K> => {
  const entries = keys.map(key => [key, object[key]]);
  return Object.fromEntries(entries);
};

/**
 * Walk the tree and omit bookkeeping/non-conent properties from `node`.
 * This includes `__uri`, `__ref`, `chosen`, `selected`.
 */
export const onlyContent = (node: NodeTreeItem): NodeTreeItem => {
  return Array.isArray(node.content?.children)
    ? {
        ...pick(node, 'type', 'uri'),
        content: {
          ...node.content,
          children: node.content?.children.filter(Boolean).map(onlyContent),
        },
      }
    : pick(node, 'type', 'uri', 'content');
};

/** Walk the tree and remove falsy `node.children`. */
export const omitFalsy = (node: NodeTreeItem): NodeTreeItem => {
  return Array.isArray(node.content?.children)
    ? {
        ...node,
        content: {
          ...node.content,
          children: node.content?.children.filter(Boolean).map(omitFalsy),
        },
      }
    : node;
};

/** Walk the tree and add `__ref` property to `node` when missing. */
export const addRefs = (node: NodeTreeItem): NodeTreeItem => {
  if (!node.__ref) node.__ref = crypto.randomUUID();

  return Array.isArray(node.content?.children)
    ? {
        ...node,
        content: {
          ...node.content,
          children: node.content?.children.map(addRefs),
        },
      }
    : node;
};
