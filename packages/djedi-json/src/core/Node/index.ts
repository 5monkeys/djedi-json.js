import { NodeTreeItem } from "../../types";

export const createEmpty = (type: string, o?: Record<string, any>): NodeTreeItem => {
  return { content: o || {}, type };
};
