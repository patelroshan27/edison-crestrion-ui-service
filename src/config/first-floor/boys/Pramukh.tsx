import {
  ArrowDownToLine,
  ArrowUpToLine,
  Bluetooth,
  Lightbulb,
  LightbulbOff,
  Mic,
  MicOff,
  Music2,
  PauseOctagon,
  Projector,
  Speech,
  Sun,
  SunDim,
} from 'lucide-react';
import type { ApiCommand, UIConfig } from 'config/Configs';
import { commonRoomColorStates } from 'config/ConfigData';
import { MandirSvg } from 'svgs/Mandir';
import { type ProjectorStatusResponse } from 'types/apiResponses';
import {
  audioResponsive,
  lightControlResponsive,
  pageResponsive,
  pharosResponsive,
} from 'config/responsive';

const Pramukh: UIConfig = {
  rooms: [],
  id: 123,
  authProviderURL: '/crestron/passcodes/validate',
  pharosApiPath: '/pharos/send',
  zumApiPath: '/zum/send',
  audioApiPath: '/audio/send',
  mediaApiPath: '/mediaplayer/send',
  projectorApiPath: '/video/projector/send',
  authID: 'Pramukh',
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
                { type: 'zum', payloads: [{ room: 'pramukh', scene: '1' }] },
              ],
            },
            {
              kind: 'light',
              icon: Sun,
              title: 'Lights',
              label: 'Crown',
              apiCommands: [
                { type: 'zum', payloads: [{ room: 'pramukh', scene: '3' }] },
              ],
            },
            {
              kind: 'light',
              icon: SunDim,
              title: 'Lights',
              label: 'Ceiling',
              apiCommands: [
                { type: 'zum', payloads: [{ room: 'pramukh', scene: '2' }] },
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
                  payloads: [{ room: 'pramukh', scene: '16' }],
                },
              ],
            },
            {
              kind: 'light',
              icon: Lightbulb,
              title: 'Lights',
              label: 'All On',
              apiCommands: [
                { type: 'zum', payloads: [{ room: 'pramukh', scene: '1' }] },
                {
                  type: 'pharos',
                  payloads: [{ room: 'pramukh', scene: '01' }],
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
                  payloads: [{ room: 'pramukh', scene: '16' }],
                },
                {
                  type: 'pharos',
                  payloads: [{ room: 'pramukh', scene: '00' }],
                },
              ],
            },
          ],
        },
        pharos: {
          kind: 'pharos',
          room: 'pramukh',
          className: `row-span-4 col-span-3 ${pharosResponsive}`,
          colorStates: commonRoomColorStates,
        },
      },
    },
    AUDIO: {
      name: 'Audio',
      icon: Music2,
      className: `!grid-cols-[1fr_2fr] ${audioResponsive}`,
      controls: {
        speaker: {
          kind: 'audio',
          icon: Music2,
          label: 'Master',
          playLabel: 'Unmute',
          pauseLabel: 'Mute',
          maxDB: 48311,
          getVolCmd: {
            type: 'audio',
            payload: {
              dspId: 'bk',
              cmdType: 'GS',
              cmdName: 'Get Vol',
              controlNumber: '2',
              controlPosition: '',
            },
          },
          volChangeCmd: {
            type: 'audio',
            payload: {
              dspId: 'bk',
              cmdType: 'CS',
              cmdName: 'Vol Change',
              controlNumber: '2',
              controlPosition: '',
            },
          },
          getMuteStatusCmd: {
            type: 'audio',
            payload: {
              dspId: 'bk',
              cmdType: 'GS',
              cmdName: 'Mute Status',
              controlNumber: '3',
              controlPosition: '',
            },
          },
          muteCmd: {
            type: 'audio',
            payload: {
              dspId: 'bk',
              cmdType: 'CS',
              cmdName: 'Vol Mute',
              controlNumber: '3',
              controlPosition: '65535',
            },
          },
          unMuteCmd: {
            type: 'audio',
            payload: {
              dspId: 'bk',
              cmdType: 'CS',
              cmdName: 'Vol Unmute',
              controlNumber: '3',
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
                  controlNumber: '1',
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
                    dspId: 'bk',
                    cmdType: 'CS',
                    cmdName: 'Source',
                    controlNumber: '1',
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
                    controlNumber: '1',
                    controlPosition: '13107',
                  },
                },
              ],
            },
            {
              kind: 'toggle',
              title: 'Source',
              icon: MandirSvg,
              label: 'Mandir',
              apiCommands: [
                {
                  type: 'audio',
                  payload: {
                    dspId: 'bk',
                    cmdType: 'CS',
                    cmdName: 'Source',
                    controlNumber: '1',
                    controlPosition: '26214',
                  },
                },
              ],
            },
            {
              kind: 'toggle',
              icon: MandirSvg,
              title: 'Source',
              label: 'Aksharpith',
              apiCommands: [
                {
                  type: 'audio',
                  payload: {
                    dspId: 'bk',
                    cmdType: 'CS',
                    cmdName: 'Source',
                    controlNumber: '1',
                    controlPosition: '39321',
                  },
                },
              ],
            },
          ],
        },
      },
    },
    VIDEO: {
      name: 'Video',
      className: pageResponsive,
      icon: Sun,
      controls: {
        screens: {
          kind: 'group',
          className:
            'row-span-4 grid grid-cols-1 gap-2 grid-rows-[1fr_1fr_1fr]',
          controls: [
            {
              kind: 'toggle',
              icon: ArrowUpToLine,
              title: 'Screen',
              label: 'Up',
              apiCommands: [
                {
                  type: 'signal',
                  payload: { signalName: '31' },
                },
              ],
            },
            {
              kind: 'toggle',
              icon: PauseOctagon,
              title: 'Screen',
              label: 'Stop',
              apiCommands: [
                {
                  type: 'signal',
                  payload: { signalName: '32' },
                },
              ],
            },
            {
              kind: 'toggle',
              icon: ArrowDownToLine,
              title: 'Screen',
              label: 'Down',
              apiCommands: [
                {
                  type: 'signal',
                  payload: { signalName: '33' },
                },
              ],
            },
          ],
        },
        projector: {
          kind: 'apiToggle',
          icon: Mic,
          iconOff: MicOff,
          title: 'Projector',
          label: 'On',
          labelOff: 'Off',
          onApiCommands: [
            {
              type: 'projector',
              payloads: [{ authId: 'Pramukh', action: 'ON' }],
            },
          ],
          offApiCommands: [
            {
              type: 'projector',
              payloads: [{ authId: 'Pramukh', action: 'OFF' }],
            },
          ],
          getActiveState: async (
            sendCommands: (commands: ApiCommand[]) => Promise<unknown[]>,
          ) => {
            const results = await sendCommands([
              {
                type: 'projector',
                payloads: [{ authId: 'Pramukh', action: 'STATUS' }],
              },
            ]);
            return (results as ProjectorStatusResponse[])[0][0].power === 'ON';
          },
        },
        projectorSource: {
          kind: 'group',
          className: 'grid gap-2',
          getActiveValue: (
            sendCommands: (commands: ApiCommand[]) => Promise<unknown[]>,
          ) => {
            return sendCommands([
              {
                type: 'projector',
                payloads: [{ authId: 'Pramukh', action: 'STATUS' }],
              },
            ]).then(
              (results) => (results as ProjectorStatusResponse[])[0][0].source,
            );
          },
          controls: [
            {
              kind: 'toggle',
              icon: Projector,
              title: 'Projector Source',
              label: 'HDMI1',
              apiCommands: [
                {
                  type: 'projector',
                  payloads: [
                    {
                      authId: 'Pramukh',
                      action: 'SOURCE',
                      videoSource: 'hdmi',
                    },
                  ],
                },
              ],
            }
          ],
        },
      },
    },
  },
};

export default Pramukh;
