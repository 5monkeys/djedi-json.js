/** clean the tree from faulty nodes */
export const cleanTree = (t: NodeTreeItem): NodeTreeItem => {
  return Array.isArray(t.content?.children)
    ? {
        ...t,
        content: { ...t.content, children: t.content?.children.filter(Boolean).map(cleanTree) },
      }
    : t;
};

export function lossyDeepClone<T>(o: T) {
  return JSON.parse(JSON.stringify(o));
}
