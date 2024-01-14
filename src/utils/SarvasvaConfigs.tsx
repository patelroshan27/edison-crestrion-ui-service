import {
  Lightbulb,
  ListMusic,
  Music2,
  PowerOff,
  Sun,
  SunDim,
} from 'lucide-react';
import type { UIConfig } from 'utils/Configs';

const Configs: UIConfig = {
  id: 123,
  // proximityActivity: '71',
  // touchActivity: '72',
  crestronConfigs: {
    host: '10.25.20.81',
    ipID: 19,
    port: 41794,
  },
  pages: {
    LIGHTS: {
      name: 'Lights',
      icon: Sun,
      controls: {
        off: {
          kind: 'light',
          icon: Lightbulb,
          title: 'Lights',
          label: 'Normal',
          state: '1',
          stateOff: '20',
          intensityStates: [
            { state: '4', stateOff: '1', name: 'Medium', icon: Sun },
            { state: '5', stateOff: '1', name: 'Low', icon: SunDim },
          ],
        },
        pharos: {
          kind: 'pharos',
          colorStates: [
            { state: '2', name: 'Off', color: '#3F3F46', icon: PowerOff },
            { state: '6', name: 'Orange', color: '#F5A524' },
            { state: '7', name: 'Sky Blue', color: '#06B7DB' },
            { state: '8', name: 'Gold', color: '#F7B750' },
            { state: '9', name: 'Yellow', color: '#FBDBA7' },
            { state: '10', name: 'Red', color: '#F31260' },
            { state: '11', name: 'Purple', color: '#7828C8' },
            { state: '12', name: 'Green', color: '#12A150' },
            { state: '13', name: 'Blue', color: '#006FEE' },
            { state: '14', name: 'White', color: '#FFFFFF' },
            { state: '15', name: 'Mint', color: '#74DFA2' },
            { state: '16', name: 'Pink', color: '#FF71D7' },
          ],
        },
      },
    },
    AUDIO: {
      name: 'Audio',
      icon: Music2,
      controls: {
        speaker: {
          kind: 'audio',
          icon: Music2,
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
          icon: Music2,
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
          icon: Music2,
          label: 'Mic',
          state: '35',
        },
        bluetooth: {
          kind: 'toggle',
          icon: Music2,
          title: 'Source',
          label: 'Bluetooth',
          state: '31',
        },
        media: {
          kind: 'toggle',
          icon: Music2,
          title: 'Source',
          label: 'Media Player',
          state: '31',
        },
        mandir: {
          kind: 'toggle',
          icon: Music2,
          title: 'Source',
          label: 'Mandir',
          state: '32',
        },
      },
    },
    MEDIA: {
      name: 'Media',
      icon: ListMusic,
      controls: {
        mandir: {
          kind: 'toggle',
          icon: ListMusic,
          title: 'Source',
          label: 'Mandir',
          state: '21',
        },
        sabhahall: {
          kind: 'toggle',
          icon: ListMusic,
          title: 'Source',
          label: 'Sabha Hall',
          state: '22',
        },
      },
    },
  },
};

export default Configs;
