import { CMSConfigSettings } from '../../types';
import { ChildrenProps } from '../Children/type';

export interface IsomorphicCustom {
  isomorphic?: boolean;
  children?: ChildrenProps;
}

export interface CustomProps extends Partial<CMSConfigSettings> {
  type: string;
}
