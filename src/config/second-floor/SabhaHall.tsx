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
} from 'lucide-react';
import type { ApiCommand, UIConfig } from 'config/Configs';
import { sabhaHallColorStates } from 'config/ConfigData';

const SabhaHall: UIConfig = {
  rooms: [],
  id: 123,
  authProviderURL: '/crestron/passcodes/validate',
  pharosApiPath: '/pharos/send',
  zumApiPath: '/zum/send',
  audioApiPath: '/audio/send',
  mediaApiPath: '/mediaplayer/send',
  authID: 'SabhaHall',
  lockTimeout: 20000000,
  crestronConfigs: {
    host: '10.25.20.93',
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
          className:
            'row-span-4 grid grid-cols-2 grid-rows-[1fr_1fr_1fr_1fr_1fr] gap-2',
          controls: [
            {
              kind: 'light',
              icon: Lightbulb,
              title: 'Lights',
              label: 'On',
              apiCommands: [
                { type: 'zum', payloads: [{ room: 'sabhahall', scene: '1' }] },
              ],
            },
            {
              kind: 'light',
              icon: LightbulbOff,
              title: 'Lights',
              label: 'Off',
              apiCommands: [
                { type: 'zum', payloads: [{ room: 'sabhahall', scene: '16' }] },
              ],
            },
            {
              kind: 'light',
              icon: Sun,
              title: 'Lights',
              label: 'Med',
              apiCommands: [
                { type: 'zum', payloads: [{ room: 'sabhahall', scene: '2' }] },
              ],
            },
            {
              kind: 'light',
              icon: SunDim,
              title: 'Lights',
              label: 'Low',
              apiCommands: [
                { type: 'zum', payloads: [{ room: 'sabhahall', scene: '3' }] },
              ],
            },
            {
              kind: 'light',
              icon: SunDim,
              title: 'Lights',
              label: 'Stage On',
              apiCommands: [
                { type: 'zum', payloads: [{ room: 'sabhahall', scene: '4' }] },
              ],
            },
            {
              kind: 'light',
              icon: SunDim,
              title: 'Lights',
              label: 'Stage Off',
              apiCommands: [
                { type: 'zum', payloads: [{ room: 'sabhahall', scene: '5' }] },
              ],
            },
            {
              kind: 'light',
              icon: SunDim,
              title: 'Lights',
              label: 'Center On',
              apiCommands: [
                { type: 'zum', payloads: [{ room: 'sabhahall', scene: '6' }] },
              ],
            },
            {
              kind: 'light',
              icon: SunDim,
              title: 'Lights',
              label: 'Center Off',
              apiCommands: [
                { type: 'zum', payloads: [{ room: 'sabhahall', scene: '7' }] },
              ],
            },
            {
              kind: 'light',
              icon: Lightbulb,
              title: 'Lights',
              label: 'All On',
              apiCommands: [
                { type: 'zum', payloads: [{ room: 'sabhahall', scene: '2' }] },
                {
                  type: 'pharos',
                  payloads: [{ room: 'sabhahall', scene: '01' }],
                },
              ],
            },
            {
              kind: 'light',
              icon: LightbulbOff,
              title: 'Lights',
              label: 'All Off',
              apiCommands: [
                { type: 'zum', payloads: [{ room: 'sabhahall', scene: '16' }] },
                {
                  type: 'pharos',
                  payloads: [{ room: 'sabhahall', scene: '00' }],
                },
              ],
            },
          ],
        },
        pharos: {
          kind: 'pharos',
          room: 'sabhahall',
          className: 'row-span-4 col-span-3',
          colorStates: sabhaHallColorStates,
        },
      },
    },
  },
};

export default SabhaHall;
