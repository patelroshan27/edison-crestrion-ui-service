import { atom } from 'recoil';
import { getConfigs } from 'utils/Configs';

const configs = getConfigs();

export const pageState = atom({
  key: 'nav/pageState',
  default: Object.keys(configs.pages)[0],
});
