import { CMSConfigSettings } from '../../types';

export interface ChildrenProps extends Partial<CMSConfigSettings> {
  allowed?: string[];
  injectButton?: boolean;
  self?: boolean;
}
