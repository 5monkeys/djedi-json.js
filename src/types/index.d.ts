
declare interface ComponentConfig {
  title: string;
  description?: string;
  editable: boolean;
  removable: boolean;
  icon?: React.ReactElement;
  Component: React.FunctionComponent<any>;
  type: string;
  content: Record<string, any>;
  editOnClick?: boolean;
}

declare interface LeanComponentConfig {
  Component: React.FunctionComponent<any>;
  type: string;
}

declare interface Config {
  components: ComponentConfig[];
  edit: EditConfig;
}

declare interface LeanConfig {
  components: LeanComponentConfig[]
}

declare type EditConfigEntry = {
  Component: any;
};

declare type EditConfig = Record<string, EditConfigEntry>;


// Children can be either an array of NodeTreeItems or something else used by the component itself.
declare interface NodeContentType extends Record<string, any> {
  children?: NodeTreeItem[] | string;
}

// When saved the NodeItems receive a unique uri.
declare type NodeTreeItem = { content: NodeContentType; type: string; uri?: string; __uri?: string };
