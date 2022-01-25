export const getEditConfig = (config: Config, type: string) => {
  return config.edit[type];
};

/** clean the tree from faulty nodes */
export const cleanTree = (t: NodeTreeItem): NodeTreeItem => {
  return Array.isArray(t.content?.children)
    ? {
        ...t,
        content: { ...t.content, children: t.content?.children.filter(Boolean).map(cleanTree) },
      }
    : t;
};
