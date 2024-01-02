import type { UIConfig } from 'utils/Configs';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

const DefaultConfigs: UIConfig = {
  crestronConfigs: {
    host: '192.168.1.1',
    ipID: 10,
    port: 42900, // 41794,
  },
  layout: {
    bodyColor: '#ecf0f1',
    navColor: '#34495e',
  },
  pages: {
    LIGHTS: {
      name: 'Lights',
      icon: icon({ name: 'lightbulb' }),
      controls: {},
    },
  },
};

export default DefaultConfigs;
