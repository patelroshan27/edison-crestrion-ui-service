import {
  ApiCommand,
  type ApiToggleButtonData,
  type AudioApiCommand,
  type AudioDspIdType,
} from './Configs';

const getMuteStatusCmd = (
  dspId: AudioDspIdType,
  controlNumber: string,
): AudioApiCommand => ({
  type: 'audio',
  payload: {
    dspId,
    cmdType: 'GS',
    cmdName: 'Mute Status',
    controlNumber,
    controlPosition: '',
  },
});

export const getMuteStatusFn =
  (
    dspId: AudioDspIdType,
    controlNumber: string,
  ): ApiToggleButtonData['getActiveState'] =>
  (sendCommands) =>
    sendCommands([getMuteStatusCmd(dspId, controlNumber)]).then(
      (results) => !(Number(results) === 0),
    );

export const getMuteCommand = (
  dspId: AudioDspIdType,
  controlNumber: string,
): AudioApiCommand => ({
  type: 'audio',
  payload: {
    dspId,
    cmdType: 'CS',
    cmdName: 'Vol Mute',
    controlNumber,
    controlPosition: '65535',
  },
});

export const getUnMuteCommand = (
  dspId: AudioDspIdType,
  controlNumber: string,
): AudioApiCommand => ({
  type: 'audio',
  payload: {
    dspId,
    cmdType: 'CS',
    cmdName: 'Vol Unmute',
    controlNumber,
    controlPosition: '0',
  },
});
