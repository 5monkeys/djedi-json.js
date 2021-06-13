import { CMSConfigSettings } from '../../types';

export interface ChildrenProps extends Partial<CMSConfigSettings> {
  allowed?: string[];
  self?: boolean;
}
