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

export const LOGGED_OUT_USER = { role: '', name: '', passcode: '' };
export const loggedInUserState = atom({
  key: 'app/loggedInUserState',
  default: LOGGED_OUT_USER,
});

export const webRelayPendingActionState = atom({
  key: 'webRelayPendingActionState',
  default: '',
});
