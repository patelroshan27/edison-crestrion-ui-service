import type { UIConfig } from 'utils/Configs';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

const SarvasvaStudyRoomConfigs: UIConfig = {
  id: 125,
  proximityActivity: '71',
  touchActivity: '72',
  crestronConfigs: {
    host: '10.21.21.201',
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
        scene2: {
          kind: 'toggle',
          icon: icon({ name: 'lightbulb' }),
          title: 'Lights',
          label: 'Ceiling',
          state: '2',
          stateOff: '20',
          intensityStates: [
            { state: '8', stateOff: '2', name: 'Medium' },
            { state: '9', stateOff: '2', name: 'Low' },
          ],
        },
        scene3: {
          kind: 'toggle',
          icon: icon({ name: 'lightbulb' }),
          title: 'Lights',
          label: 'Spots',
          state: '3',
          stateOff: '20',
          intensityStates: [
            { state: '10', stateOff: '3', name: 'Medium' },
            { state: '11', stateOff: '3', name: 'Low' },
          ],
        },
        scene4: {
          kind: 'toggle',
          icon: icon({ name: 'lightbulb' }),
          title: 'Lights',
          label: 'Soffit',
          state: '4',
          stateOff: '20',
          intensityStates: [
            { state: '12', stateOff: '4', name: 'Medium' },
            { state: '13', stateOff: '4', name: 'Low' },
          ],
        },
        scene5: {
          kind: 'toggle',
          icon: icon({ name: 'lightbulb' }),
          title: 'Lights',
          label: 'Spots and Soffits',
          state: '5',
          stateOff: '20',
          intensityStates: [
            { state: '14', stateOff: '5', name: 'Medium' },
            { state: '15', stateOff: '5', name: 'Low' },
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
  },
};

export default SarvasvaStudyRoomConfigs;
