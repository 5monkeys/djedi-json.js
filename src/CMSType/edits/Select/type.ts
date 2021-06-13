import { CMSConfigSettings } from '../../types';

export interface SelectProps extends Partial<CMSConfigSettings> {
  options: Array<{ value: string; label: string } | string | number>;
  nullable?: boolean;
}
