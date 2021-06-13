import { CMSConfigSettings } from '../../types';

export interface IsomorphicCustom {
  isomorphic?: boolean;
}

export interface CustomProps extends Partial<CMSConfigSettings> {
  type: string;
}
