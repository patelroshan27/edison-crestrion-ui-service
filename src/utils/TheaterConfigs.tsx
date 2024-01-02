import type { UIConfig } from 'utils/Configs';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

const TheaterConfigs: UIConfig = {
  crestronConfigs: {
    host: '10.21.166.14',
    ipID: 19,
    port: 41794,
  },
  layout: {
    bodyColor: '#ecf0f1',
    foregroundColor: '#ecf0f1',
    navColor: '#2c3e50',
  },
  pages: {
    LIGHTS: {
      name: 'Lights',
      icon: icon({ name: 'lightbulb' }),
      controls: {
        first: {
          kind: 'light',
          icon: icon({ name: 'lightbulb' }),
          label: 'Cove',
          state: '1',
          stateOff: '2',
        },
        second: {
          kind: 'light',
          icon: icon({ name: 'lightbulb' }),
          label: 'Scones',
          state: '3',
          stateOff: '4',
        },
      },
    },
  },
};

export default TheaterConfigs;
