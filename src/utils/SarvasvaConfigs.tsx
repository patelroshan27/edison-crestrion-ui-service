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
          label: 'On/Off',
          state: '1',
          stateOff: '20',
          intensityStates: [
            { state: '4', stateOff: '1', name: 'Medium' },
            { state: '5', stateOff: '1', name: 'Low' },
          ],
        },
        pharos: {
          kind: 'light',
          icon: icon({ name: 'power-off' }),
          title: 'Pharos Lights',
          label: 'On/Off',
          state: '1',
          stateOff: '20',
          intensityStates: [
            { state: '6', stateOff: '2', name: 'Orange' },
            { state: '7', stateOff: '2', name: 'Sky Blue' },
            { state: '8', stateOff: '2', name: 'Gold' },
            { state: '9', stateOff: '2', name: 'Yellow' },
            { state: '10', stateOff: '2', name: 'Red' },
            { state: '11', stateOff: '2', name: 'Purple' },
            { state: '12', stateOff: '2', name: 'Green' },
            { state: '13', stateOff: '2', name: 'Blue' },
            { state: '14', stateOff: '2', name: 'White' },
            { state: '15', stateOff: '2', name: 'Mint' },
            { state: '16', stateOff: '2', name: 'Pink' },
          ],
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
          label: 'Master',
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
        mic: {
          kind: 'toggle',
          title: 'Source',
          icon: icon({ name: 'microphone-lines' }),
          label: 'Mic',
          state: '35',
        },
        bluetooth: {
          kind: 'toggle',
          icon: icon({ name: 'signal' }),
          title: 'Source',
          label: 'Bluetooth',
          state: '31',
        },
        media: {
          kind: 'toggle',
          icon: icon({ name: 'signal' }),
          title: 'Source',
          label: 'Media Player',
          state: '31',
        },
        mandir: {
          kind: 'toggle',
          icon: icon({ name: 'om' }),
          title: 'Source',
          label: 'Mandir',
          state: '32',
        },
        sabhahall: {
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
          label: 'Spare',
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
        sabhahall: {
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
          label: 'Spare',
          state: '23',
        },
      },
    },
  },
};

export default SarvasvaConfigs;
