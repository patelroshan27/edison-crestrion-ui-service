import { Sun } from 'lucide-react';
import type { UIConfig } from 'config/Configs';
import { mandirColorStates } from 'config/ConfigData';
import { pageResponsive, pharosResponsive } from 'config/responsive';

const FFCorridor: UIConfig = {
  rooms: [{ key: 'ffcorridor', title: 'FFCorridor' }],
  id: 123,
  authProviderURL: '/crestron/passcodes/validate',
  pharosApiPath: '/pharos/send',
  zumApiPath: '/zum/send',
  audioApiPath: '/audio/send',
  mediaApiPath: '/mediaplayer/send',
  authID: 'ShayonaFresh',
  crestronConfigs: {
    host: '10.25.20.63',
    ipID: 19,
    port: 41794,
  },
  pages: {
    LIGHTS: {
      name: 'Lights',
      className: `!grid-cols-1 ${pageResponsive}`,
      icon: Sun,
      controls: {
        pharos: {
          kind: 'pharos',
          room: 'ffcorridor',
          className: `${pharosResponsive}`,
          colorStates: mandirColorStates,
        },
      },
    },
  },
};

export default FFCorridor;
