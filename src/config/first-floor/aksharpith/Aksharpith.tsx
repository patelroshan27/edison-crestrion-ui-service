import {
  Bluetooth,
  Flower2,
  Lightbulb,
  LightbulbOff,
  ListMusic,
  Mic2,
  Music2,
  Sun,
  SunDim,
} from 'lucide-react';
import type { ApiCommand, UIConfig } from 'config/Configs';
import { commonRoomColorStates } from 'config/ConfigData';
import {
  audioResponsive,
  lightControlResponsive,
  pageResponsive,
  pharosResponsive,
} from 'config/responsive';

const Aksharpith: UIConfig = {
  rooms: [
    { key: 'aksharpith', title: 'Aksharpith' },
    { key: 'shayonafresh', title: 'ShayonaFresh' },
    { key: 'ffcorridor', title: 'FFCorridor' },
  ],
  id: 123,
  authProviderURL: '/crestron/passcodes/validate',
  pharosApiPath: '/pharos/send',
  zumApiPath: '/zum/send',
  audioApiPath: '/audio/send',
  mediaApiPath: '/mediaplayer/send',
  authID: 'Aksharpith',
  crestronConfigs: {
    host: '10.25.20.63',
    ipID: 19,
    port: 41794,
  },
  pages: {
    LIGHTS: {
      name: 'Lights',
      className: pageResponsive,
      icon: Sun,
      controls: {
        lights: {
          kind: 'group',
          className: `row-span-4 grid grid-cols-1 grid-rows-[1fr_1fr_1fr_1fr_1fr_1fr] gap-2 ${lightControlResponsive}`,
          controls: [
            {
              kind: 'light',
              icon: Lightbulb,
              title: 'Lights',
              label: 'On',
              apiCommands: [
                { type: 'zum', payloads: [{ room: 'aksharpith', scene: '1' }] },
              ],
            },
            {
              kind: 'light',
              icon: Sun,
              title: 'Lights',
              label: 'Medium',
              apiCommands: [
                { type: 'zum', payloads: [{ room: 'aksharpith', scene: '2' }] },
              ],
            },
            {
              kind: 'light',
              icon: SunDim,
              title: 'Lights',
              label: 'Low',
              apiCommands: [
                { type: 'zum', payloads: [{ room: 'aksharpith', scene: '3' }] },
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
                  payloads: [{ room: 'aksharpith', scene: '16' }],
                },
              ],
            },
            {
              kind: 'light',
              icon: Lightbulb,
              title: 'Lights',
              label: 'All On',
              apiCommands: [
                { type: 'zum', payloads: [{ room: 'aksharpith', scene: '2' }] },
                {
                  type: 'pharos',
                  payloads: [{ room: 'aksharpith', scene: '01' }],
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
                  payloads: [{ room: 'aksharpith', scene: '16' }],
                },
                {
                  type: 'pharos',
                  payloads: [{ room: 'aksharpith', scene: '00' }],
                },
              ],
            },
          ],
        },
        pharos: {
          kind: 'pharos',
          room: 'aksharpith',
          className: `row-span-4 col-span-3 ${pharosResponsive}`,
          colorStates: commonRoomColorStates,
        },
      },
    },
    AUDIO: {
      name: 'Audio',
      icon: Music2,
      className: `!grid-cols-[1fr_1fr_1fr_2fr] ${audioResponsive}`,
      controls: {
        aksharpith: {
          kind: 'audio',
          icon: Music2,
          label: 'Aksharpith',
          playLabel: 'Unmute',
          pauseLabel: 'Mute',
          getVolCmd: {
            type: 'audio',
            payload: {
              dspId: 'mandir',
              cmdType: 'GS',
              cmdName: 'Get Vol',
              controlNumber: '7',
              controlPosition: '',
            },
          },
          volChangeCmd: {
            type: 'audio',
            payload: {
              dspId: 'mandir',
              cmdType: 'CS',
              cmdName: 'Vol Change',
              controlNumber: '7',
              controlPosition: '',
            },
          },
          resetCmd: {
            type: 'audio',
            payload: {
              dspId: 'mandir',
              cmdType: 'LP',
              cmdName: 'Vol Reset',
              controlNumber: '1',
              controlPosition: '',
            },
          },
        },
        mandirfoyer: {
          kind: 'audio',
          icon: Music2,
          label: 'Mandir Foyer',
          playLabel: 'Unmute',
          pauseLabel: 'Mute',
          getVolCmd: {
            type: 'audio',
            payload: {
              dspId: 'mandir',
              cmdType: 'GS',
              cmdName: 'Get Vol',
              controlNumber: '5',
              controlPosition: '',
            },
          },
          volChangeCmd: {
            type: 'audio',
            payload: {
              dspId: 'mandir',
              cmdType: 'CS',
              cmdName: 'Vol Change',
              controlNumber: '5',
              controlPosition: '',
            },
          },
          resetCmd: {
            type: 'audio',
            payload: {
              dspId: 'mandir',
              cmdType: 'LP',
              cmdName: 'Vol Reset',
              controlNumber: '1',
              controlPosition: '',
            },
          },
        },
        shayonafresh: {
          kind: 'audio',
          icon: Music2,
          label: 'Shayona Fresh',
          playLabel: 'Unmute',
          pauseLabel: 'Mute',
          getVolCmd: {
            type: 'audio',
            payload: {
              dspId: 'mandir',
              cmdType: 'GS',
              cmdName: 'Get Vol',
              controlNumber: '6',
              controlPosition: '',
            },
          },
          volChangeCmd: {
            type: 'audio',
            payload: {
              dspId: 'mandir',
              cmdType: 'CS',
              cmdName: 'Vol Change',
              controlNumber: '6',
              controlPosition: '',
            },
          },
          resetCmd: {
            type: 'audio',
            payload: {
              dspId: 'mandir',
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
                  dspId: 'mandir',
                  cmdType: 'GS',
                  cmdName: 'Source',
                  controlNumber: '14',
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
              label: 'Local',
              apiCommands: [
                {
                  type: 'audio',
                  payload: {
                    dspId: 'mandir',
                    cmdType: 'CS',
                    cmdName: 'Source',
                    controlNumber: '14',
                    controlPosition: '0',
                  },
                },
              ],
            },
            {
              kind: 'toggle',
              icon: ListMusic,
              title: 'Source',
              label: 'Mandir',
              apiCommands: [
                {
                  type: 'audio',
                  payload: {
                    dspId: 'mandir',
                    cmdType: 'CS',
                    cmdName: 'Source',
                    controlNumber: '14',
                    controlPosition: '21845',
                  },
                },
              ],
            },
            {
              kind: 'toggle',
              title: 'Source',
              icon: Mic2,
              label: 'Sabha Hall',
              apiCommands: [
                {
                  type: 'audio',
                  payload: {
                    dspId: 'mandir',
                    cmdType: 'CS',
                    cmdName: 'Source',
                    controlNumber: '14',
                    controlPosition: '43690',
                  },
                },
              ],
            },
            {
              kind: 'toggle',
              icon: Flower2,
              title: 'Source',
              label: 'Media Player',
              apiCommands: [
                {
                  type: 'audio',
                  payload: {
                    dspId: 'mandir',
                    cmdType: 'CS',
                    cmdName: 'Source',
                    controlNumber: '14',
                    controlPosition: '65535',
                  },
                },
              ],
            },
          ],
        },
      },
    },
    MEDIA: {
      name: 'Media Player',
      icon: Music2,
      className: '!grid-cols-[1fr] !grid-rows-[1fr]',
      controls: {
        media: {
          kind: 'mediaPlayer',
          playerId: '4',
        },
      },
    },
  },
};

export default Aksharpith;
