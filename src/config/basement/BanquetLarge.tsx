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

const BanquetLarge: UIConfig = {
  rooms: [
    { key: 'banquetlarge', title: 'BanquetLarge' },
  ],
  id: 123,
  authProviderURL: '/crestron/passcodes/validate',
  audioApiPath: '/audio/send',
  mediaApiPath: '/mediaplayer/send',
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
                { type : 'projector', payloads: [{ authId: 'BanquetLarge', action: 'poweron' }] },
              ],
            },
            {
              kind: 'toggle',
              icon: LightbulbOff,
              title: 'Projector',
              label: 'Off',
              apiCommands: [
                { type : 'projector', payloads: [{ authId: 'BanquetLarge', action: 'poweroff' }] },
              ],
            }
          ],
        },
        pharos: {
          kind: 'pharos',
          room: 'aksharpith',
          className: 'row-span-4 col-span-3',
          colorStates: commonRoomColorStates,
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
