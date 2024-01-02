import type { UIConfig } from 'utils/Configs';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

const SarvasvaConfigs: UIConfig = {
  id: 123,
  proximityActivity: '71',
  touchActivity: '72',
  crestronConfigs: {
    host: '10.21.21.202',
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
        off: {
          kind: 'light',
          icon: icon({ name: 'power-off' }),
          title: 'Lights',
          label: 'All On/Off',
          state: '1',
          stateOff: '20',
          intensityStates: [
            { state: '6', stateOff: '1', name: 'Medium' },
            { state: '7', stateOff: '1', name: 'Low' },
          ],
        },
      },
    },
    HVAC: {
      name: 'HVAC',
      icon: icon({ name: 'fan' }),
      controls: {
        temperature: {
          kind: 'temperature',
        },
      },
    },
    SOURCE: {
      name: 'Audio',
      icon: icon({ name: 'music' }),
      controls: {
        speaker: {
          kind: 'audio',
          icon: icon({ name: 'tent' }),
          label: 'Speaker',
          play: '46',
          pause: '45',
          toggle: '44',
          lock: '43',
          levelDown: '42',
          levelUp: '41',
          state: '31',
          playLabel: 'Unmute',
          pauseLabel: 'Mute',
        },
        microphone: {
          kind: 'audio',
          icon: icon({ name: 'tent' }),
          label: 'Mic',
          play: '52',
          pause: '51',
          toggle: '50',
          lock: '43',
          levelDown: '48',
          levelUp: '47',
          state: '32',
          playLabel: 'Unmute',
          pauseLabel: 'Mute',
        },
        bluetooth: {
          kind: 'toggle',
          icon: icon({ name: 'signal' }),
          title: 'Source',
          label: 'Bluetooth',
          state: '31',
        },
        mandir: {
          kind: 'toggle',
          icon: icon({ name: 'om' }),
          title: 'Source',
          label: 'Mandir',
          state: '32',
        },
        pramukhhall: {
          kind: 'toggle',
          icon: icon({ name: 'people-roof' }),
          title: 'Source',
          label: 'Sabha Hall',
          state: '33',
        },
        event: {
          kind: 'toggle',
          title: 'Source',
          icon: icon({ name: 'tent' }),
          label: 'Event Tent',
          state: '34',
        },
        mic: {
          kind: 'toggle',
          title: 'Source',
          icon: icon({ name: 'microphone-lines' }),
          label: 'Mic',
          state: '35',
        },
      },
    },
    VIDEO: {
      name: 'Video',
      icon: icon({ name: 'video' }),
      controls: {
        mandir: {
          kind: 'toggle',
          icon: icon({ name: 'om' }),
          title: 'Source',
          label: 'Mandir',
          state: '21',
        },
        pramukhhall: {
          kind: 'toggle',
          icon: icon({ name: 'people-roof' }),
          title: 'Source',
          label: 'Sabha Hall',
          state: '22',
        },
        event: {
          kind: 'toggle',
          title: 'Source',
          icon: icon({ name: 'tent' }),
          label: 'Event Tent',
          state: '23',
        },
        site: {
          kind: 'toggle',
          title: 'Source',
          icon: icon({ name: 'helmet-safety' }),
          label: 'Akshardham Site',
          state: '24',
        },
      },
    },
    CURTAINS: {
      name: 'Curtains',
      icon: icon({ name: 'person-booth' }),
      controls: {
        left: {
          kind: 'toggle',
          title: 'Curtain',
          icon: icon({ name: 'person-booth' }),
          label: 'Left Curtain',
          state: '67',
          intensityStates: [
            { state: '67', stateOff: '5', name: 'Raise' },
            { state: '68', stateOff: '5', name: 'Stop' },
            { state: '69', stateOff: '5', name: 'Lower' },
          ],
        },
        right: {
          kind: 'toggle',
          title: 'Curtain',
          icon: icon({ name: 'person-booth' }),
          label: 'Right Curtain',
          state: '61',
          intensityStates: [
            { state: '61', stateOff: '5', name: 'Raise' },
            { state: '62', stateOff: '5', name: 'Stop' },
            { state: '63', stateOff: '5', name: 'Lower' },
          ],
        },
        all: {
          kind: 'toggle',
          title: 'Curtains',
          icon: icon({ name: 'person-booth' }),
          label: 'All Curtains',
          state: '64',
          intensityStates: [
            { state: '64', stateOff: '5', name: 'Raise' },
            { state: '65', stateOff: '5', name: 'Stop' },
            { state: '66', stateOff: '5', name: 'Lower' },
          ],
        },
      },
    },
  },
};

export default SarvasvaConfigs;
