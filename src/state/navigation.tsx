import { atom } from 'recoil';
import { getConfigs } from 'config/Configs';

const defaultConfig = getConfigs();

export const pageState = atom({
  key: 'nav/pageState',
  default: Object.keys(defaultConfig.pages)[0],
});

export const activeConfigState = atom({
  key: 'activeConfigState',
  default: defaultConfig,
});

export const isLoggedInState = atom({
  key: 'nav/isLoggedInState',
  default: false,
});

export const webRelayPendingActionState = atom({
  key: 'webRelayPendingActionState',
  default: '',
});
