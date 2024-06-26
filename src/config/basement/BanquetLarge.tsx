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
