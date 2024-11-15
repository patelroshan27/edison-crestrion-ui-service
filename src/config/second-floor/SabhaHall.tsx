import { Lightbulb, LightbulbOff, Sun, SunDim } from 'lucide-react';
import type { UIConfig } from 'config/Configs';
import { sabhaHallColorStates } from 'config/ConfigData';
import { pageResponsive } from 'config/responsive';

const SabhaHall: UIConfig = {
  rooms: [
    { key: 'sabhahall', title: 'SabhaHall' },
    { key: 'lobby260', title: 'SecondFloor Lobby' },
  ],
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
      className: `!grid-rows-1 grid-cols-[1fr_2fr] ${pageResponsive}`,
      controls: {
        lights: {
          kind: 'group',
          className: `row-span-4 grid grid-cols-2 grid-rows-[1fr_1fr_1fr_1fr_1fr] gap-2`,
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
                { type: 'zum', payloads: [{ room: 'sabhahall', scene: '5' }] },
              ],
            },
            {
              kind: 'light',
              icon: SunDim,
              title: 'Lights',
              label: 'Stage Off',
              apiCommands: [
                { type: 'zum', payloads: [{ room: 'sabhahall', scene: '4' }] },
              ],
            },
            {
              kind: 'light',
              icon: SunDim,
              title: 'Lights',
              label: 'Center On',
              apiCommands: [
                { type: 'zum', payloads: [{ room: 'sabhahall', scene: '7' }] },
              ],
            },
            {
              kind: 'light',
              icon: SunDim,
              title: 'Lights',
              label: 'Center Off',
              apiCommands: [
                { type: 'zum', payloads: [{ room: 'sabhahall', scene: '6' }] },
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
          className: `row-span-4`,
          colorStates: sabhaHallColorStates,
        },
      },
    },
  },
};

export default SabhaHall;
