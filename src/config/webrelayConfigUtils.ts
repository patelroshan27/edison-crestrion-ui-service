import {
  type CrestronWebrelayPayload,
  type WebrelayApiCommand,
} from './Configs';

export const getWebrelayToggleCmd = (
  payload: Omit<CrestronWebrelayPayload, 'action'>,
): WebrelayApiCommand => ({
  type: 'webrelay',
  payload: {
    action: 'TOGGLE',
    ...payload,
  },
});
