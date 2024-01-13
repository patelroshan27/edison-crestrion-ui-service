import type { UIConfig } from 'utils/Configs';
import { Lightbulb } from 'lucide-react';

const DefaultConfigs: UIConfig = {
  crestronConfigs: {
    host: '192.168.1.1',
    ipID: 10,
    port: 42900, // 41794,
  },
  pages: {
    LIGHTS: {
      name: 'Lights',
      icon: Lightbulb,
      controls: {},
    },
  },
};

export default DefaultConfigs;
