import {
  Lightbulb,
  LightbulbOff,
  Mic,
  MicOff,
  Music2,
  Sun,
} from 'lucide-react';
import type { UIConfig } from 'config/Configs';

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
                  payloads: [{ authId: 'BanquetLarge', action: 'poweron' }],
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
                  payloads: [{ authId: 'BanquetLarge', action: 'poweroff' }],
                },
              ],
            },
          ],
        },
      },
    },
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
          label: 'On',
          labelOff: 'Muted',
          apiCommands: [
            {
              type: 'audio',
              payload: {
                dspId: 'basement',
                cmdType: 'CS',
                cmdName: 'Vol Mute',
                controlNumber: '5',
                controlPosition: '65535',
              },
            },
          ],
          getActiveState: async (sendCommands) => {
            return sendCommands([
              {
                type: 'audio',
                payload: {
                  dspId: 'basement',
                  cmdType: 'GS',
                  cmdName: 'Mute Status',
                  controlNumber: '5',
                  controlPosition: '',
                },
              },
            ]).then((results) => !(Number(results) === 0));
          },
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
  },
};

export default BanquetLarge;
