import { Bluetooth, Flower2, Lightbulb, LightbulbOff, ListMusic, Music2, Speech, Sun, SunDim } from 'lucide-react';
import { ApiCommand, type UIConfig } from 'config/Configs';
import { commonRoomColorStates } from 'config/ConfigData';

const SantCorridor: UIConfig = {
  rooms: [],
  id: 123,
  authProviderURL: '/crestron/passcodes/validate',
  pharosApiPath: '/pharos/send',
  zumApiPath: '/zum/send',
  audioApiPath: '/audio/send',
  authID: 'SantCorridor',
  crestronConfigs: {
    host: '10.25.20.81',
    ipID: 19,
    port: 41794,
  },
  pages: {
    LIGHTS: {
      name: 'Lights',
      icon: Sun,
      controls: {
        lights: {
          kind: 'group',
          className:
            'row-span-4 grid grid-cols-1 grid-rows-[1fr_1fr_1fr_1fr_1fr_1fr] gap-2',
          controls: [
            {
              kind: 'light',
              icon: Lightbulb,
              title: 'Lights',
              label: 'On',
              apiCommands: [
                {
                  type: 'zum',
                  payloads: [{ room: 'santcorridor', scene: '1' }],
                },
              ],
            },
            {
              kind: 'light',
              icon: Sun,
              title: 'Lights',
              label: 'Medium',
              apiCommands: [
                {
                  type: 'zum',
                  payloads: [{ room: 'santcorridor', scene: '2' }],
                },
              ],
            },
            {
              kind: 'light',
              icon: SunDim,
              title: 'Lights',
              label: 'Low',
              apiCommands: [
                {
                  type: 'zum',
                  payloads: [{ room: 'santcorridor', scene: '3' }],
                },
              ],
            },
            {
              kind: 'light',
              icon: LightbulbOff,
              title: 'Lights',
              label: 'Off',
              apiCommands: [
                {
                  type: 'zum',
                  payloads: [{ room: 'santcorridor', scene: '16' }],
                },
              ],
            },
            {
              kind: 'light',
              icon: Lightbulb,
              title: 'Lights',
              label: 'All On',
              apiCommands: [
                {
                  type: 'zum',
                  payloads: [{ room: 'santcorridor', scene: '2' }],
                },
                {
                  type: 'pharos',
                  payloads: [{ room: 'santcorridor', scene: '01' }],
                },
              ],
            },
            {
              kind: 'light',
              icon: LightbulbOff,
              title: 'Lights',
              label: 'All Off',
              apiCommands: [
                {
                  type: 'zum',
                  payloads: [{ room: 'santcorridor', scene: '16' }],
                },
                {
                  type: 'pharos',
                  payloads: [{ room: 'santcorridor', scene: '00' }],
                },
              ],
            },
          ],
        },
        pharos: {
          kind: 'pharos',
          room: 'santcorridor',
          className: 'row-span-4 col-span-3 gap-16',
          colorStates: commonRoomColorStates,
        },
      },
    },
    AUDIO: {
      name: 'Audio',
      icon: Music2,
      className: '!grid-cols-[1fr_2fr_1fr]',
      controls: {
        speaker: {
          kind: 'audio',
          icon: Music2,
          label: 'Master',
          playLabel: 'Unmute',
          pauseLabel: 'Mute',
          getVolCmd: {
            type: 'audio',
            payload: {
              dspId: 'bk',
              cmdType: 'GS',
              cmdName: 'Get Vol',
              controlNumber: '15',
              controlPosition: '',
            },
          },
          volChangeCmd: {
            type: 'audio',
            payload: {
              dspId: 'bk',
              cmdType: 'CS',
              cmdName: 'Vol Change',
              controlNumber: '15',
              controlPosition: '',
            },
          },
          getMuteStatusCmd: {
            type: 'audio',
            payload: {
              dspId: 'bk',
              cmdType: 'GS',
              cmdName: 'Mute Status',
              controlNumber: '14',
              controlPosition: '',
            },
          },
          muteCmd: {
            type: 'audio',
            payload: {
              dspId: 'bk',
              cmdType: 'CS',
              cmdName: 'Vol Mute',
              controlNumber: '14',
              controlPosition: '65535',
            },
          },
          unMuteCmd: {
            type: 'audio',
            payload: {
              dspId: 'bk',
              cmdType: 'CS',
              cmdName: 'Vol Unmute',
              controlNumber: '14',
              controlPosition: '0',
            },
          },
          resetCmd: {
            type: 'audio',
            payload: {
              dspId: 'bk',
              cmdType: 'LP',
              cmdName: 'Vol Reset',
              controlNumber: '1',
              controlPosition: '',
            },
          },
        },
        sources: {
          kind: 'group',
          className:
            'row-span-4 grid !grid-cols-2 !grid-rows-[1fr_1fr_1fr_1fr] gap-2',
          getActiveValue: (
            sendCommands: (commands: ApiCommand[]) => Promise<unknown[]>,
          ) => {
            return sendCommands([
              {
                type: 'audio',
                payload: {
                  dspId: 'bk',
                  cmdType: 'GS',
                  cmdName: 'Source',
                  controlNumber: '13',
                  controlPosition: '',
                },
              },
            ]).then((results) => (results[0] as number).toString());
          },
          parseActiveValueKey: (cmd: ApiCommand) =>
            cmd.type === 'audio' ? cmd.payload.controlPosition : '',
          controls: [
            {
              kind: 'toggle',
              icon: Bluetooth,
              title: 'Source',
              label: 'Bluetooth',
              apiCommands: [
                {
                  type: 'audio',
                  payload: {
                    dspId: 'bk',
                    cmdType: 'CS',
                    cmdName: 'Source',
                    controlNumber: '13',
                    controlPosition: '0',
                  },
                },
              ],
            },
            {
              kind: 'toggle',
              icon: Speech,
              title: 'Source',
              label: 'Sabha Hall',
              apiCommands: [
                {
                  type: 'audio',
                  payload: {
                    dspId: 'bk',
                    cmdType: 'CS',
                    cmdName: 'Source',
                    controlNumber: '13',
                    controlPosition: '13107',
                  },
                },
              ],
            },
            {
              kind: 'toggle',
              title: 'Source',
              icon: Flower2,
              label: 'Mandir',
              apiCommands: [
                {
                  type: 'audio',
                  payload: {
                    dspId: 'bk',
                    cmdType: 'CS',
                    cmdName: 'Source',
                    controlNumber: '13',
                    controlPosition: '26214',
                  },
                },
              ],
            },
            {
              kind: 'toggle',
              icon: Flower2,
              title: 'Source',
              label: 'Aksharpith',
              apiCommands: [
                {
                  type: 'audio',
                  payload: {
                    dspId: 'bk',
                    cmdType: 'CS',
                    cmdName: 'Source',
                    controlNumber: '13',
                    controlPosition: '39321',
                  },
                },
              ],
            },
            {
              kind: 'toggle',
              icon: ListMusic,
              title: 'Source',
              label: 'Media Player',
              apiCommands: [
                {
                  type: 'audio',
                  payload: {
                    dspId: 'bk',
                    cmdType: 'CS',
                    cmdName: 'Source',
                    controlNumber: '13',
                    controlPosition: '52428',
                  },
                },
              ],
            },
            {
              kind: 'toggle',
              icon: ListMusic,
              title: 'Source',
              label: 'Brahmanand',
              apiCommands: [
                {
                  type: 'audio',
                  payload: {
                    dspId: 'bk',
                    cmdType: 'CS',
                    cmdName: 'Source',
                    controlNumber: '13',
                    controlPosition: '65535',
                  },
                },
              ],
            },            
          ],
        },
      },
    },
  },
};

export default SantCorridor;
