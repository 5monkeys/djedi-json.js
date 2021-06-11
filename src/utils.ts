import { ComponentConfig, Config, NodeTreeItem } from 'types';
import { DEFAULT_EDIT_MAP } from './CMSType/CMSTypes';

export const validateConfig = (config: Config) => {
  // check if the edit type exists.
  config.components.every((cc: ComponentConfig) => {
    return Object.entries(cc.content).every(([k, { type }]) => {
      if (config.edit[type]) {
        console.log(`%c✅ ${cc.type}:${k} validated as ${type}`, 'color: darkgreen');
        return true;
      }
      console.log(`%c❌ edit type missing for ${cc.type}`, 'color: red');
      return false;
    });
  });
};

export const createConfig = (passedConfig: Partial<Config>): Config => {
  const edit = {
    ...DEFAULT_EDIT_MAP,
    // overwrite the defaults with the user supplied ones, in case something is needed
    ...(passedConfig.edit || {}),
  };
  const config = {
    ...passedConfig,
    components: [...(passedConfig?.components || [])],
    edit: edit,
  };

  // validate the config before continuing
  validateConfig(config);
  return config;
};

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

export const createEmpty = (type: string): NodeTreeItem => {
  return { content: {}, type };
};
