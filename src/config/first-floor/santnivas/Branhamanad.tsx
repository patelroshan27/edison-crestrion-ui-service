import {
  Bluetooth,
  Flower2,
  Lightbulb,
  LightbulbOff,
  ListMusic,
  Mic2,
  Music2,
  PowerOff,
  Speech,
  Sun,
  SunDim,
} from 'lucide-react';
import type { ApiCommand, UIConfig } from 'config/Configs';

const Branhamanad: UIConfig = {
  rooms: [
    { key: 'sarvasva', title: 'Sarvasva' },
    { key: 'santoffice1', title: 'Office1' },
    { key: 'santoffice2', title: 'Office2' },
    { key: 'branhamanad', title: 'Branhamanad' },
    { key: 'santcorridor', title: 'Corridor' },
    { key: 'santkitchen', title: 'Kitchen' },
  ],
  id: 123,
  authProviderURL: '/crestron/passcodes/validate',
  pharosApiPath: '/pharos/send',
  zumApiPath: '/zum/send',
  audioApiPath: '/audio/send',
  mediaApiPath: '/mediaplayer/send',
  authID: 'Branhamanad',
  lockTimeout: 20000000,
  crestronConfigs: {
    host: '10.25.20.71',
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
          controls: [
            {
              kind: 'light',
              icon: Lightbulb,
              title: 'Lights',
              label: 'On',
              apiCommands: [
                { type: 'zum', payloads: [{ room: '172', scene: '1' }] },
              ],
            },
            {
              kind: 'light',
              icon: Sun,
              title: 'Lights',
              label: 'Medium',
              apiCommands: [
                { type: 'zum', payloads: [{ room: '172', scene: '2' }] },
              ],
            },
            {
              kind: 'light',
              icon: SunDim,
              title: 'Lights',
              label: 'Low',
              apiCommands: [
                { type: 'zum', payloads: [{ room: '172', scene: '3' }] },
              ],
            },
            {
              kind: 'light',
              icon: LightbulbOff,
              title: 'Lights',
              label: 'Off',
              apiCommands: [
                { type: 'zum', payloads: [{ room: '172', scene: '16' }] },
              ],
            },
            {
              kind: 'light',
              icon: Lightbulb,
              title: 'Lights',
              label: 'All On',
              apiCommands: [
                { type: 'zum', payloads: [{ room: '172', scene: '2' }] },
                { type: 'pharos', payloads: [{ room: '172', scene: '01' }] },
              ],
            },
            {
              kind: 'light',
              icon: LightbulbOff,
              title: 'Lights',
              label: 'All Off',
              apiCommands: [
                { type: 'zum', payloads: [{ room: '172', scene: '16' }] },
                { type: 'pharos', payloads: [{ room: '172', scene: '00' }] },
              ],
            },
          ],
        },
        pharos: {
          kind: 'pharos',
          room: '172',
          colorStates: [
            {
              name: 'Off',
              color: 'rgba(255,255,255,0.1)',
              icon: PowerOff,
              scene: '00',
            },
            {
              name: 'Light Orange',
              color: 'rgb(225,169,104)',
              scene: '01',
            },
            {
              name: 'Dark Orange',
              color: 'rgb(196,100,0)',
              scene: '02',
            },
            { name: 'Blue', color: 'rgb(2,0,255)', scene: '03' },
            {
              name: 'Gold',
              color: 'rgb(166,156,0)',
              scene: '04',
            },
            {
              name: 'Yellow',
              color: 'rgb(225,220,114)',
              scene: '05',
            },
            {
              name: 'Bright Red',
              color: 'rgb(252,86,86)',
              scene: '06',
            },
            {
              name: 'Purple',
              color: 'rgb(171,145,248)',
              scene: '07',
            },
            {
              name: 'Dark Green',
              color: 'rgb(54,143,15)',
              scene: '08',
            },
            {
              name: 'Sky Blue',
              color: 'rgb(141,238,255)',
              scene: '09',
            },
            {
              name: 'White',
              color: 'rgb(255,255,255)',
              scene: '10',
            },
            {
              name: 'Mint',
              color: 'rgb(40,162,125)',
              scene: '11',
            },
            {
              name: 'Dark Pink',
              color: 'rgb(248,82,143)',
              scene: '12',
            },
            { name: 'Red', color: 'rgb(219,0,22)', scene: '13' },
            {
              name: 'Dark Purple',
              color: 'rgb(63,13,100)',
              scene: '14',
            },
            {
              name: 'Dark Yellow',
              color: 'rgb(255,185,29)',
              scene: '15',
            },
            {
              name: 'Dark Brown',
              color: 'rgb(83,37,0)',
              scene: '16',
            },
            {
              name: 'Grey',
              color: 'rgb(143,136,136)',
              scene: '17',
            },
            {
              name: 'Dark Red',
              color: 'rgb(108,12,12)',
              scene: '18',
            },
            {
              name: 'Dark Pink',
              color: 'rgb(252, 7, 234)',
              scene: '19',
            },
          ],
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
              controlNumber: '5',
              controlPosition: '',
            },
          },
          volChangeCmd: {
            type: 'audio',
            payload: {
              dspId: 'bk',
              cmdType: 'CS',
              cmdName: 'Vol Change',
              controlNumber: '5',
              controlPosition: '',
            },
          },
          getMuteStatusCmd: {
            type: 'audio',
            payload: {
              dspId: 'bk',
              cmdType: 'GS',
              cmdName: 'Mute Status',
              controlNumber: '4',
              controlPosition: '',
            },
          },
          muteCmd: {
            type: 'audio',
            payload: {
              dspId: 'bk',
              cmdType: 'CS',
              cmdName: 'Vol Mute',
              controlNumber: '4',
              controlPosition: '65535',
            },
          },
          unMuteCmd: {
            type: 'audio',
            payload: {
              dspId: 'bk',
              cmdType: 'CS',
              cmdName: 'Vol Unmute',
              controlNumber: '4',
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
          className: '!grid-cols-2 !grid-rows-[1fr_1fr_1fr_1fr]',
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
                  controlNumber: '6',
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
                    controlNumber: '6',
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
                    controlNumber: '6',
                    controlPosition: '16383',
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
                    controlNumber: '6',
                    controlPosition: '32766',
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
                    controlNumber: '6',
                    controlPosition: '49149',
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
                    controlNumber: '6',
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
          playerId: '10',
        },
      },
    },
  },
};

export default Branhamanad;
