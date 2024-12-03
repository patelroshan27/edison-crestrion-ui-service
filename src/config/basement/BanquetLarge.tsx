import { Mic, MicOff, Music2, Projector, Sun } from 'lucide-react';
import type { ApiCommand, UIConfig } from 'config/Configs';
import {
  getMuteCommand,
  getMuteStatusFn,
  getUnMuteCommand,
} from 'config/audioConfigUtils';

const BanquetLarge: UIConfig = {
  rooms: [{ key: 'banquetlarge', title: 'BanquetLarge' }],
  id: 123,
  authProviderURL: '/crestron/passcodes/validate',
  audioApiPath: '/audio/send',
  mediaApiPath: '/mediaplayer/send',
  projectorApiPath: '/video/projector/send',
  authID: 'BanquetLarge',
  crestronConfigs: {
    host: '10.25.20.98',
    ipID: 19,
    port: 41794,
  },
  pages: {
    AUDIO: {
      name: 'Audio',
      icon: Music2,
      className: '!grid-cols-[1fr_1fr_1fr_1fr]',
      controls: {
        mediaplayer: {
          kind: 'audio',
          icon: Music2,
          maxDB: 44420,
          label: 'Media Player',
          playLabel: 'Unmute',
          pauseLabel: 'Mute',
          getVolCmd: {
            type: 'audio',
            payload: {
              dspId: 'basement',
              cmdType: 'GS',
              cmdName: 'Get Vol',
              controlNumber: '3',
              controlPosition: '',
            },
          },
          volChangeCmd: {
            type: 'audio',
            payload: {
              dspId: 'basement',
              cmdType: 'CS',
              cmdName: 'Vol Change',
              controlNumber: '3',
              controlPosition: '',
            },
          },
          unMuteCmd: {
            type: 'audio',
            payload: {
              dspId: 'basement',
              cmdType: 'CS',
              cmdName: 'Vol Unmute',
              controlNumber: '5',
              controlPosition: '0',
            },
          },
        },
        mic1: {
          kind: 'audio',
          icon: Music2,
          label: 'Mic 1',
          maxDB: 56199,
          playLabel: 'Unmute',
          pauseLabel: 'Mute',
          getVolCmd: {
            type: 'audio',
            payload: {
              dspId: 'basement',
              cmdType: 'GS',
              cmdName: 'Get Vol',
              controlNumber: '13',
              controlPosition: '',
            },
          },
          volChangeCmd: {
            type: 'audio',
            payload: {
              dspId: 'basement',
              cmdType: 'CS',
              cmdName: 'Vol Change',
              controlNumber: '13',
              controlPosition: '',
            },
          },
        },
        mic2: {
          kind: 'audio',
          icon: Music2,
          label: 'Mic 2',
          maxDB: 56199,
          playLabel: 'Unmute',
          pauseLabel: 'Mute',
          getVolCmd: {
            type: 'audio',
            payload: {
              dspId: 'basement',
              cmdType: 'GS',
              cmdName: 'Get Vol',
              controlNumber: '14',
              controlPosition: '',
            },
          },
          volChangeCmd: {
            type: 'audio',
            payload: {
              dspId: 'basement',
              cmdType: 'CS',
              cmdName: 'Vol Change',
              controlNumber: '14',
              controlPosition: '',
            },
          },
        },
        extra: {
          kind: 'apiToggle',
          icon: Mic,
          iconOff: MicOff,
          title: 'Volume',
          label: 'Mute',
          labelOff: 'Unmute',
          onApiCommands: [getMuteCommand('basement', '5')],
          offApiCommands: [getUnMuteCommand('basement', '5')],
          getActiveState: getMuteStatusFn('basement', '5'),
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
          playerId: '14',
        },
      },
    },
    VIDEO: {
      name: 'Video',
      icon: Sun,
      controls: {
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
              payloads: [{ authId: 'BanquetLarge', action: 'ON' }],
            },
          ],
          offApiCommands: [
            {
              type: 'projector',
              payloads: [{ authId: 'BanquetLarge', action: 'OFF' }],
            },
          ],
          getActiveState: async (
            sendCommands: (commands: ApiCommand[]) => Promise<unknown[]>,
          ) => {
            const results = await sendCommands([
              {
                type: 'projector',
                payloads: [{ authId: 'BanquetLarge', action: 'STATUS' }],
              },
            ]);
            console.log(results);
            return (results[0] as any)[0].power === 'ON';
          },
        },
        projectorSource: {
          kind: 'group',
          className:
            'row-span-4 grid grid-cols-1 grid-rows-[1fr_1fr_1fr_1fr_1fr_1fr] gap-2',
          getActiveValue: (
            sendCommands: (commands: ApiCommand[]) => Promise<unknown[]>,
          ) => {
            return sendCommands([
              {
                type: 'projector',
                payloads: [{ authId: 'BanquetLarge', action: 'STATUS' }],
              },
            ]).then((results) => (results[0] as any)[0].source);
          },

          controls: [
            {
              kind: 'toggle',
              icon: Projector,
              title: 'Source',
              label: 'VIDEO',
              apiCommands: [
                {
                  type: 'projector',
                  payloads: [
                    {
                      authId: 'BanquetLarge',
                      action: 'SOURCE',
                      videoSource: '',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    },
  },
};

export default BanquetLarge;
