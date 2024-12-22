import {
  Bluetooth,
  Flower2,
  Lightbulb,
  LightbulbOff,
  ListMusic,
  Music2,
  Speech,
  Sun,
  SunDim,
} from 'lucide-react';
import { type ApiCommand, type UIConfig } from 'config/Configs';
import { commonRoomColorStates } from 'config/ConfigData';
import {
  audioResponsive,
  lightControlResponsive,
  pageResponsive,
  pharosResponsive,
} from 'config/responsive';

const SantOffice2: UIConfig = {
  rooms: [],
  id: 123,
  authProviderURL: '/crestron/passcodes/validate',
  pharosApiPath: '/pharos/send',
  zumApiPath: '/zum/send',
  audioApiPath: '/audio/send',
  authID: 'SantOffice2',
  crestronConfigs: {
    host: '10.25.20.81',
    ipID: 19,
    port: 41794,
  },
  pages: {
    LIGHTS: {
      name: 'Lights',
      className: `grid-cols-[1fr_3fr] ${pageResponsive}`,
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
                {
                  type: 'zum',
                  payloads: [{ room: 'santoffice2', scene: '1' }],
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
                  payloads: [{ room: 'santoffice2', scene: '2' }],
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
                  payloads: [{ room: 'santoffice2', scene: '3' }],
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
                  payloads: [{ room: 'santoffice2', scene: '16' }],
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
                  payloads: [{ room: 'santoffice2', scene: '2' }],
                },
                {
                  type: 'pharos',
                  payloads: [{ room: 'santoffice2', scene: '01' }],
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
                  payloads: [{ room: 'santoffice2', scene: '16' }],
                },
                {
                  type: 'pharos',
                  payloads: [{ room: 'santoffice2', scene: '00' }],
                },
              ],
            },
          ],
        },
        pharos: {
          kind: 'pharos',
          room: 'santoffice2',
          className: pharosResponsive,
          colorStates: commonRoomColorStates,
        },
      },
    },
    AUDIO: {
      name: 'Audio',
      icon: Music2,
      className: `!grid-cols-[1fr_2fr_1fr] ${audioResponsive}`,
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
              controlNumber: '23',
              controlPosition: '',
            },
          },
          volChangeCmd: {
            type: 'audio',
            payload: {
              dspId: 'bk',
              cmdType: 'CS',
              cmdName: 'Vol Change',
              controlNumber: '23',
              controlPosition: '',
            },
          },
          getMuteStatusCmd: {
            type: 'audio',
            payload: {
              dspId: 'bk',
              cmdType: 'GS',
              cmdName: 'Mute Status',
              controlNumber: '26',
              controlPosition: '',
            },
          },
          muteCmd: {
            type: 'audio',
            payload: {
              dspId: 'bk',
              cmdType: 'CS',
              cmdName: 'Vol Mute',
              controlNumber: '26',
              controlPosition: '65535',
            },
          },
          unMuteCmd: {
            type: 'audio',
            payload: {
              dspId: 'bk',
              cmdType: 'CS',
              cmdName: 'Vol Unmute',
              controlNumber: '26',
              controlPosition: '0',
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
                  controlNumber: '21',
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
                    controlNumber: '21',
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
                    controlNumber: '21',
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
                    controlNumber: '21',
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
                    controlNumber: '21',
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
                    controlNumber: '21',
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
                    controlNumber: '21',
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

export default SantOffice2;
