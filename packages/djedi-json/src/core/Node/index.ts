import { NodeTreeItem } from '../../types';

export const createEmpty = (type: string, content?: Record<string, any>): NodeTreeItem => {
  content ??= {};
  return {
    content,
    type,
    __ref: crypto.randomUUID(),
  };
};
