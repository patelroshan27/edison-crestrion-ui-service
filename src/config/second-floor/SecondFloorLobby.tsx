import { Sun } from 'lucide-react';
import { type UIConfig } from 'config/Configs';
import { commonRoomColorStates } from 'config/ConfigData';
import { pageResponsive, pharosResponsive } from 'config/responsive';

const SecondFloorLobby: UIConfig = {
  rooms: [],
  id: 123,
  authProviderURL: '/crestron/passcodes/validate',
  pharosApiPath: '/pharos/send',
  zumApiPath: '/zum/send',
  audioApiPath: '/audio/send',
  authID: 'lobby260',
  crestronConfigs: {
    host: '10.25.20.93',
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
          room: 'lobby260',
          className: `[&>*]:h-[9rem] [&>*]:w-[9rem] ${pharosResponsive}`,
          colorStates: commonRoomColorStates,
        },
      },
    },
  },
};

export default SecondFloorLobby;
