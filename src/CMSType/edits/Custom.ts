export interface CustomProps extends CMSConfigSettings {
  type: string;
}

export const type = (settings: CustomProps) => {
  return {
    swap: false,
    ...settings,
  };
};
