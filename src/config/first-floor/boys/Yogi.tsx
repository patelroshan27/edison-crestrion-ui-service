import {
  ArrowDownToLine,
  ArrowUpToLine,
  Bluetooth,
  Lightbulb,
  LightbulbOff,
  Music2,
  PauseOctagon,
  Speech,
  Sun,
  SunDim,
} from 'lucide-react';
import type { ApiCommand, UIConfig } from 'config/Configs';
import { commonRoomColorStates } from 'config/ConfigData';
import { MandirSvg } from 'svgs/Mandir';

const Yogi: UIConfig = {
  rooms: [],
  id: 123,
  authProviderURL: '/crestron/passcodes/validate',
  pharosApiPath: '/pharos/send',
  zumApiPath: '/zum/send',
  audioApiPath: '/audio/send',
  mediaApiPath: '/mediaplayer/send',
  projectorApiPath: '/video/projector/send',
  authID: 'Yogi',
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
                { type: 'zum', payloads: [{ room: 'yogi', scene: '1' }] },
              ],
            },
            {
              kind: 'light',
              icon: Sun,
              title: 'Lights',
              label: 'Crown',
              apiCommands: [
                { type: 'zum', payloads: [{ room: 'yogi', scene: '3' }] },
              ],
            },
            {
              kind: 'light',
              icon: SunDim,
              title: 'Lights',
              label: 'Ceiling',
              apiCommands: [
                { type: 'zum', payloads: [{ room: 'yogi', scene: '2' }] },
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
                  payloads: [{ room: 'yogi', scene: '16' }],
                },
              ],
            },
            {
              kind: 'light',
              icon: Lightbulb,
              title: 'Lights',
              label: 'All On',
              apiCommands: [
                { type: 'zum', payloads: [{ room: 'yogi', scene: '1' }] },
                {
                  type: 'pharos',
                  payloads: [{ room: 'yogi', scene: '01' }],
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
                  payloads: [{ room: 'yogi', scene: '16' }],
                },
                {
                  type: 'pharos',
                  payloads: [{ room: 'yogi', scene: '00' }],
                },
              ],
            },
          ],
        },
        pharos: {
          kind: 'pharos',
          room: 'yogi',
          className: 'row-span-4 col-span-3',
          colorStates: commonRoomColorStates,
        },
      },
    },
    AUDIO: {
      name: 'Audio',
      icon: Music2,
      className: '!grid-cols-[1fr_1fr_1fr_2fr]',
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
              dspId: 'mandir',
              cmdType: 'GS',
              cmdName: 'Get Vol',
              controlNumber: '16',
              controlPosition: '',
            },
          },
          volChangeCmd: {
            type: 'audio',
            payload: {
              dspId: 'mandir',
              cmdType: 'CS',
              cmdName: 'Vol Change',
              controlNumber: '16',
              controlPosition: '',
            },
          },
        },
        mic1: {
          kind: 'audio',
          icon: Music2,
          label: 'Mic1',
          playLabel: 'Unmute',
          pauseLabel: 'Mute',
          maxDB: 56310,
          getVolCmd: {
            type: 'audio',
            payload: {
              dspId: 'mandir',
              cmdType: 'GS',
              cmdName: 'Get Vol',
              controlNumber: '22',
              controlPosition: '',
            },
          },
          volChangeCmd: {
            type: 'audio',
            payload: {
              dspId: 'mandir',
              cmdType: 'CS',
              cmdName: 'Vol Change',
              controlNumber: '22',
              controlPosition: '',
            },
          },
        },
        mic2: {
          kind: 'audio',
          icon: Music2,
          label: 'Mic2',
          playLabel: 'Unmute',
          pauseLabel: 'Mute',
          maxDB: 56310,
          getVolCmd: {
            type: 'audio',
            payload: {
              dspId: 'mandir',
              cmdType: 'GS',
              cmdName: 'Get Vol',
              controlNumber: '23',
              controlPosition: '',
            },
          },
          volChangeCmd: {
            type: 'audio',
            payload: {
              dspId: 'mandir',
              cmdType: 'CS',
              cmdName: 'Vol Change',
              controlNumber: '23',
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
                  controlNumber: '15',
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
                    controlNumber: '15',
                    controlPosition: '0',
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
                    controlNumber: '15',
                    controlPosition: '16384',
                  },
                },
              ],
            },
            {
              kind: 'toggle',
              title: 'Source',
              icon: Speech,
              label: 'Sabha Hall',
              apiCommands: [
                {
                  type: 'audio',
                  payload: {
                    dspId: 'mandir',
                    cmdType: 'CS',
                    cmdName: 'Source',
                    controlNumber: '15',
                    controlPosition: '32768',
                  },
                },
              ],
            },
            {
              kind: 'toggle',
              icon: MandirSvg,
              title: 'Source',
              label: 'Wireless',
              apiCommands: [
                {
                  type: 'audio',
                  payload: {
                    dspId: 'mandir',
                    cmdType: 'CS',
                    cmdName: 'Source',
                    controlNumber: '15',
                    controlPosition: '49151',
                  },
                },
              ],
            },
            {
              kind: 'toggle',
              icon: Speech,
              title: 'Source',
              label: 'Spare',
              apiCommands: [
                {
                  type: 'audio',
                  payload: {
                    dspId: 'mandir',
                    cmdType: 'CS',
                    cmdName: 'Source',
                    controlNumber: '15',
                    controlPosition: '65535',
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
      icon: Sun,
      controls: {
        projectors: {
          kind: 'group',
          className:
            'row-span-4 grid grid-cols-1 grid-rows-[1fr_1fr_1fr_1fr_1fr_1fr] gap-2',
          controls: [
            {
              kind: 'toggle',
              icon: Lightbulb,
              title: 'Projector',
              label: 'On',
              apiCommands: [
                {
                  type: 'projector',
                  payloads: [{ authId: 'Yogi', action: 'poweron' }],
                },
              ],
            },
            {
              kind: 'toggle',
              icon: LightbulbOff,
              title: 'Projector',
              label: 'Off',
              apiCommands: [
                {
                  type: 'projector',
                  payloads: [{ authId: 'Yogi', action: 'poweroff' }],
                },
              ],
            },
          ],
        },
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
      },
    },
  },
};

export default Yogi;
