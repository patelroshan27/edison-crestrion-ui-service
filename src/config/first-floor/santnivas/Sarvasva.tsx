import {
  Bluetooth,
  Clock,
  Lightbulb,
  LightbulbOff,
  ListMusic,
  Mic2,
  Music2,
  Speech,
  Sun,
  SunDim,
} from 'lucide-react';
import { MandirSvg } from '../../../svgs/Mandir';
import { type ApiCommand, type UIConfig } from 'config/Configs';
import { commonRoomColorStates } from 'config/ConfigData';
import {
  pageResponsive,
  lightControlResponsive,
  pharosResponsive,
} from 'config/responsive';

const Configs: UIConfig = {
  rooms: [
    { key: 'sarvasva', title: 'Sarvasva' },
    { key: 'santoffice1', title: 'Office1' },
    { key: 'santoffice2', title: 'Office2' },
    { key: 'bramhanand', title: 'Bramhanand' },
    { key: 'santcorridor', title: 'Corridor' },
    { key: 'santkitchen', title: 'Kitchen' },
  ],
  id: 123,
  authProviderURL: '/crestron/passcodes/validate',
  pharosApiPath: '/pharos/send',
  zumApiPath: '/zum/send',
  audioApiPath: '/audio/send',
  mediaApiPath: '/mediaplayer/send',
  authID: 'Sarvasva',
  lockTimeout: 200000000,
  crestronConfigs: {
    host: '10.25.20.81',
    ipID: 19,
    port: 41794,
  },
  pages: {
    LIGHTS: {
      name: 'Lights',
      icon: Sun,
      className: `grid-cols-[1fr_3fr] ${pageResponsive}`,
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
                { type: 'zum', payloads: [{ room: 'sarvasva', scene: '1' }] },
              ],
            },
            {
              kind: 'light',
              icon: Sun,
              title: 'Lights',
              label: 'Medium',
              apiCommands: [
                { type: 'zum', payloads: [{ room: 'sarvasva', scene: '2' }] },
              ],
            },
            {
              kind: 'light',
              icon: SunDim,
              title: 'Lights',
              label: 'Low',
              apiCommands: [
                { type: 'zum', payloads: [{ room: 'sarvasva', scene: '3' }] },
              ],
            },
            {
              kind: 'light',
              icon: LightbulbOff,
              title: 'Lights',
              label: 'Off',
              apiCommands: [
                { type: 'zum', payloads: [{ room: 'sarvasva', scene: '16' }] },
              ],
            },
            {
              kind: 'light',
              icon: Lightbulb,
              title: 'Lights',
              label: 'All On',
              apiCommands: [
                { type: 'zum', payloads: [{ room: 'sarvasva', scene: '2' }] },
                {
                  type: 'pharos',
                  payloads: [{ room: 'sarvasva', scene: '01' }],
                },
              ],
            },
            {
              kind: 'light',
              icon: LightbulbOff,
              title: 'Lights',
              label: 'All Off',
              apiCommands: [
                { type: 'zum', payloads: [{ room: 'sarvasva', scene: '16' }] },
                {
                  type: 'pharos',
                  payloads: [{ room: 'sarvasva', scene: '00' }],
                },
              ],
            },
          ],
        },
        pharos: {
          kind: 'pharos',
          room: 'sarvasva',
          className: `${pharosResponsive}`,
          colorStates: commonRoomColorStates,
        },
      },
    },
    AUDIO: {
      name: 'Audio',
      icon: Music2,
      className: `!grid-cols-[1fr_1fr_2fr] ${pageResponsive}`,
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
              dspId: 'mandir',
              cmdType: 'GS',
              cmdName: 'Get Vol',
              controlNumber: '11',
              controlPosition: '',
            },
          },
          volChangeCmd: {
            type: 'audio',
            payload: {
              dspId: 'mandir',
              cmdType: 'CS',
              cmdName: 'Vol Change',
              controlNumber: '11',
              controlPosition: '',
            },
          },
          getMuteStatusCmd: {
            type: 'audio',
            payload: {
              dspId: 'mandir',
              cmdType: 'GS',
              cmdName: 'Mute Status',
              controlNumber: '12',
              controlPosition: '',
            },
          },
          muteCmd: {
            type: 'audio',
            payload: {
              dspId: 'mandir',
              cmdType: 'CS',
              cmdName: 'Vol Mute',
              controlNumber: '12',
              controlPosition: '65535',
            },
          },
          unMuteCmd: {
            type: 'audio',
            payload: {
              dspId: 'mandir',
              cmdType: 'CS',
              cmdName: 'Vol Unmute',
              controlNumber: '12',
              controlPosition: '0',
            },
          },
          resetCmd: {
            type: 'audio',
            payload: {
              dspId: 'mandir',
              cmdType: 'LP',
              cmdName: 'Vol Reset',
              controlNumber: '10',
              controlPosition: '',
            },
          },
        },
        mediaplayer: {
          kind: 'audio',
          icon: Music2,
          label: 'Media Player',
          playLabel: 'Unmute',
          pauseLabel: 'Mute',
          getVolCmd: {
            type: 'audio',
            payload: {
              dspId: 'mandir',
              cmdType: 'GS',
              cmdName: 'Get Vol',
              controlNumber: '25',
              controlPosition: '',
            },
          },
          volChangeCmd: {
            type: 'audio',
            payload: {
              dspId: 'mandir',
              cmdType: 'CS',
              cmdName: 'Vol Change',
              controlNumber: '25',
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
                  controlNumber: '2',
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
                    dspId: 'mandir',
                    cmdType: 'CS',
                    cmdName: 'Source',
                    controlNumber: '2',
                    controlPosition: '0',
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
                    dspId: 'mandir',
                    cmdType: 'CS',
                    cmdName: 'Source',
                    controlNumber: '2',
                    controlPosition: '13107',
                  },
                },
              ],
            },
            {
              kind: 'toggle',
              title: 'Source',
              icon: Mic2,
              label: 'Mic',
              apiCommands: [
                {
                  type: 'audio',
                  payload: {
                    dspId: 'mandir',
                    cmdType: 'CS',
                    cmdName: 'Source',
                    controlNumber: '2',
                    controlPosition: '26214',
                  },
                },
              ],
            },
            {
              kind: 'toggle',
              icon: MandirSvg,
              title: 'Source',
              label: 'Mandir',
              apiCommands: [
                {
                  type: 'audio',
                  payload: {
                    dspId: 'mandir',
                    cmdType: 'CS',
                    cmdName: 'Source',
                    controlNumber: '2',
                    controlPosition: '39321',
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
                    dspId: 'mandir',
                    cmdType: 'CS',
                    cmdName: 'Source',
                    controlNumber: '2',
                    controlPosition: '52428',
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
      className: `!grid-cols-[1fr] !grid-rows-[1fr] ${pageResponsive}`,
      controls: {
        media: {
          kind: 'mediaPlayer',
          playerId: '11',
        },
      },
    },
    SCHEDULER: {
      name: 'Scheduler',
      icon: Clock,
      className: `!grid-cols-[1fr] !grid-rows-[1fr] ${pageResponsive}`,
      controls: {
        media: {
          kind: 'scheduler',
        },
      },
    },
  },
};

export default Configs;
