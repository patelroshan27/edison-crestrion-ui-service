import {
  Bluetooth,
  Flower2,
  Lightbulb,
  LightbulbOff,
  ListMusic,
  Mic2,
  Music2,
  PowerOff,
  Speech,
  Sun,
  SunDim,
  ArrowUpToLine,
  PauseOctagon,
  ArrowDownToLine,
} from 'lucide-react';
import type { UIConfig } from 'utils/Configs';

const Configs: UIConfig = {
  id: 123,
  // proximityActivity: '71',
  // touchActivity: '72',
  authProviderURL: 'http://10.25.20.40:4000/crestron/passcodes/validate',
  webRelayURL: 'http://10.25.20.40:4000/crestron/webrelays/send',
  authID: 'Sarvasva',
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
        lights: {
          kind: 'group',
          controls: [
            {
              kind: 'light',
              icon: Lightbulb,
              title: 'Lights',
              label: 'On',
              state: '1',
              stateOff: '20',
            },
            {
              kind: 'light',
              icon: Sun,
              title: 'Lights',
              label: 'Medium',
              state: '2',
              stateOff: '20',
            },
            {
              kind: 'light',
              icon: SunDim,
              title: 'Lights',
              label: 'Low',
              state: '3',
              stateOff: '20',
            },
            {
              kind: 'light',
              icon: LightbulbOff,
              title: 'Lights',
              label: 'Off',
              state: '20',
            },
            {
              kind: 'light',
              icon: Lightbulb,
              title: 'Lights',
              label: 'All On',
              state: '18',
              stateOff: '20',
            },
            {
              kind: 'light',
              icon: LightbulbOff,
              title: 'Lights',
              label: 'All Off',
              state: '19',
              stateOff: '20',
            },
          ],
        },
        pharos: {
          kind: 'pharos',
          colorStates: [
            {
              state: '100',
              name: 'Off',
              color: 'rgba(255,255,255,0.1)',
              icon: PowerOff,
            },
            { state: '101', name: 'Light Orange', color: 'rgb(225,169,104)' },
            { state: '102', name: 'Dark Orange', color: 'rgb(196,100,0)' },
            { state: '103', name: 'Blue', color: 'rgb(2,0,255)' },
            { state: '104', name: 'Gold', color: 'rgb(166,156,0)' },
            { state: '105', name: 'Yellow', color: 'rgb(225,220,114)' },
            { state: '106', name: 'Bright Red', color: 'rgb(252,86,86)' },
            { state: '107', name: 'Purple', color: 'rgb(171,145,248)' },
            { state: '108', name: 'Dark Green', color: 'rgb(54,143,15)' },
            { state: '109', name: 'Sky Blue', color: 'rgb(141,238,255)' },
            { state: '110', name: 'White', color: 'rgb(255,255,255)' },
            { state: '111', name: 'Mint', color: 'rgb(40,162,125)' },
            { state: '112', name: 'Dark Pink', color: 'rgb(248,82,143)' },
            { state: '113', name: 'Red', color: 'rgb(219,0,22)' },
            { state: '114', name: 'Dark Purple', color: 'rgb(63,13,100)' },
            { state: '115', name: 'Dark Yellow', color: 'rgb(255,185,29)' },
            { state: '116', name: 'Dark Brown', color: 'rgb(83,37,0)' },
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
        bluetooth: {
          kind: 'toggle',
          icon: Bluetooth,
          title: 'Source',
          label: 'Bluetooth',
          state: '31',
        },
        media: {
          kind: 'toggle',
          icon: ListMusic,
          title: 'Source',
          label: 'Media Player',
          state: '32',
        },
        mic: {
          kind: 'toggle',
          title: 'Source',
          icon: Mic2,
          label: 'Mic',
          state: '33',
        },
        mandir: {
          kind: 'toggle',
          icon: Flower2,
          title: 'Source',
          label: 'Mandir',
          state: '34',
        },
        sabhahall: {
          kind: 'toggle',
          icon: Speech,
          title: 'Source',
          label: 'Sabha Hall',
          state: '35',
        },
      },
    },
  },
};

export default Configs;
