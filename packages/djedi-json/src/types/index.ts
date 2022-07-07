export interface ComponentConfig {
  title: string;
  description?: string;
  editable?: boolean;
  removable?: boolean;
  movable?: boolean;
  icon?: React.ReactChild;
  Component: React.FunctionComponent<any>;
  type: string;
  content: Record<string, any>;
  editOnClick?: boolean;
}

export interface LeanComponentConfig {
  Component: React.FunctionComponent<any>;
  type: string;
}

export interface Config {
  components: ComponentConfig[];
  edit: EditConfig;
}

export interface LeanConfig {
  components: LeanComponentConfig[];
}

export type EditConfigEntry = {
  Component: any;
};

export type EditConfig = Record<string, EditConfigEntry>;

// Children can be either an array of NodeTreeItems or something else used by the component itself.
export interface NodeContentType extends Record<string, any> {
  children?: NodeTreeItem[] | string;
}

// When saved the NodeItems receive a unique uri.
export type NodeTreeItem = {
  content: NodeContentType;
  type: string;
  uri?: string;
  __uri?: string;
};
