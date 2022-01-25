import { CMSConfigSettings } from '../../types';

export interface StringProps extends CMSConfigSettings {
  settings: Omit<React.HTMLProps<HTMLInputElement>, 'value'>;
}
