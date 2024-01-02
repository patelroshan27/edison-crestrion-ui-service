import type { UIConfig } from 'utils/Configs';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

const HaveliConfigs: UIConfig = {
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
        diva: {
          kind: 'light',
          icon: icon({ name: 'lightbulb' }),
          label: 'Diva',
          state: '1',
          stateOff: '2',
        },
        abhala: {
          kind: 'light',
          icon: icon({ name: 'lightbulb' }),
          label: 'Abhala',
          state: '3',
          stateOff: '4',
        },
        cove: {
          kind: 'light',
          icon: icon({ name: 'lightbulb' }),
          label: 'Cove',
          state: '5',
          stateOff: '6',
        },
        handi: {
          kind: 'light',
          icon: icon({ name: 'lightbulb' }),
          label: 'Handi',
          state: '7',
          stateOff: '8',
        },
      },
    },
  },
};

export default HaveliConfigs;
