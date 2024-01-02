import type { UIConfig } from 'utils/Configs';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

const ShayonaConfigs: UIConfig = {
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
          label: '1st Floor',
          state: '1',
          stateOff: '2',
          analogFeedback: '1',
        },
        second: {
          kind: 'light',
          icon: icon({ name: 'lightbulb' }),
          label: '2nd Floor',
          state: '3',
          stateOff: '4',
          analogFeedback: '2',
        },
        zoneA: {
          kind: 'light',
          icon: icon({ name: 'bolt' }),
          label: 'Zone A',
          state: '5',
          stateOff: '6',
        },
        zoneB: {
          kind: 'light',
          icon: icon({ name: 'bolt' }),
          label: 'Zone B',
          state: '7',
          stateOff: '8',
        },
        kitchen: {
          kind: 'light',
          icon: icon({ name: 'fire' }),
          label: 'Kitchen',
          state: '9',
          stateOff: '10',
        },
      },
    },
    AUDIO: {
      name: 'Audio',
      icon: icon({ name: 'volume-low' }),
      controls: {
        first: {
          kind: 'audio',
          icon: icon({ name: 'water' }),
          label: 'Ambience',
          lock: '20',
          play: '13',
          state: '3',
          pause: '14',
          toggle: '44',
          levelDown: '42',
          levelUp: '41',
        },
      },
    },
  },
};

export default ShayonaConfigs;
