import { DEFAULT_EDIT_MAP } from '../../CMSType/defaults';

export const validateConfig = (config: Config) => {
  // check if the edit type exists.
  config.components.every((cc: ComponentConfig) => {
    return Object.entries(cc.content).every(([k, { type }]) => {
      if (config.edit[type]) {
        //eslint-disable-next-line no-console
        console.log(`%c✅ ${cc.type}:${k} validated as ${type}`, 'color: darkgreen');
        return true;
      }
      //eslint-disable-next-line no-console
      console.log(`%c❌ edit type missing for ${cc.type}`, 'color: red');
      return false;
    });
  });
};

export const createNodeConfig = (passedConfig: ComponentConfig) => {
  return {
    icon: null,
    removable: true,
    editable: true,
    ...passedConfig,
  };
};

export const createConfig = (passedConfig: Partial<Config>): Config => {
  const edit = {
    ...DEFAULT_EDIT_MAP,
    // overwrite the defaults with the user supplied ones, in case something is needed
    ...(passedConfig.edit || {}),
  };
  const config = {
    ...passedConfig,
    components: [...(passedConfig?.components || [])].map(createNodeConfig),
    edit: edit,
  };

  // validate the config before continuing
  validateConfig(config);
  return config;
};
