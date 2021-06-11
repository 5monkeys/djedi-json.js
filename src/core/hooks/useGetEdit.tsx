import { useCMS } from 'contexts/cms';
import { getEditConfig } from '../../utils';

export const useGetEdit = (type: string) => {
  const { config } = useCMS();
  return getEditConfig(config, type);
};
