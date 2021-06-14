import { CMSConfigSettings } from '../../types';

export interface ChildrenProps extends Partial<CMSConfigSettings> {
  allowed?: string[];
  append?: boolean;
  self?: boolean;
}
