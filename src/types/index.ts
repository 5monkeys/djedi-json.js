export interface ComponentConfig {
  title: string;
  description?: string;
  Component: React.FunctionComponent<any>;
  type: string;
  content: Record<string, any>;
  editOnClick?: boolean;
}

export interface Config {
  components: ComponentConfig[];
  edit: EditConfig;
}

export type EditConfigEntry = {
  Component: any;
};

export type EditConfig = Record<string, EditConfigEntry>;

export interface CMSEditProps<T> {
  onChange: (s: T) => void;
  value?: T;
  label?: string;
}

export interface CMSConfigSettings {
  label?: string;
  // inject?: boolean;
  // swap?: boolean;
}

// Children can be either an array of NodeTreeItems or something else used by the component itself.
export interface NodeContentType extends Record<string, any> {
  children?: NodeTreeItem[] | string | string[];
}

// When saved the NodeItems receive a unique uri.
export type NodeTreeItem = { content: NodeContentType; type: string; uri?: string; __uri?: string };
