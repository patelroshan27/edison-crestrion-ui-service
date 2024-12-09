import { Lightbulb, LightbulbOff, Sun, SunDim } from 'lucide-react';
import { type UIConfig } from 'config/Configs';
import { commonRoomColorStates } from 'config/ConfigData';
import {
  lightControlResponsive,
  pageResponsive,
  pharosResponsive,
} from 'config/responsive';

const SantKitchen: UIConfig = {
  rooms: [],
  id: 123,
  authProviderURL: '/crestron/passcodes/validate',
  pharosApiPath: '/pharos/send',
  zumApiPath: '/zum/send',
  audioApiPath: '/audio/send',
  authID: 'SantKitchen',
  crestronConfigs: {
    host: '10.25.20.81',
    ipID: 19,
    port: 41794,
  },
  pages: {
    LIGHTS: {
      name: 'Lights',
      className: `grid-cols-[1fr_3fr] ${pageResponsive}`,
      icon: Sun,
      controls: {
        lights: {
          kind: 'group',
          className: `row-span-4 grid grid-cols-1 grid-rows-[1fr_1fr_1fr_1fr_1fr_1fr] gap-2 ${lightControlResponsive}`,
          controls: [
            {
              kind: 'light',
              icon: Lightbulb,
              title: 'Lights',
              label: 'On',
              apiCommands: [
                {
                  type: 'zum',
                  payloads: [{ room: 'santkitchen', scene: '1' }],
                },
              ],
            },
            {
              kind: 'light',
              icon: Sun,
              title: 'Lights',
              label: 'Medium',
              apiCommands: [
                {
                  type: 'zum',
                  payloads: [{ room: 'santkitchen', scene: '2' }],
                },
              ],
            },
            {
              kind: 'light',
              icon: SunDim,
              title: 'Lights',
              label: 'Low',
              apiCommands: [
                {
                  type: 'zum',
                  payloads: [{ room: 'santkitchen', scene: '3' }],
                },
              ],
            },
            {
              kind: 'light',
              icon: LightbulbOff,
              title: 'Lights',
              label: 'Off',
              apiCommands: [
                {
                  type: 'zum',
                  payloads: [{ room: 'santkitchen', scene: '16' }],
                },
              ],
            },
            {
              kind: 'light',
              icon: Lightbulb,
              title: 'Lights',
              label: 'All On',
              apiCommands: [
                {
                  type: 'zum',
                  payloads: [{ room: 'santkitchen', scene: '2' }],
                },
                {
                  type: 'pharos',
                  payloads: [{ room: 'santkitchen', scene: '01' }],
                },
              ],
            },
            {
              kind: 'light',
              icon: LightbulbOff,
              title: 'Lights',
              label: 'All Off',
              apiCommands: [
                {
                  type: 'zum',
                  payloads: [{ room: 'santkitchen', scene: '16' }],
                },
                {
                  type: 'pharos',
                  payloads: [{ room: 'santkitchen', scene: '00' }],
                },
              ],
            },
          ],
        },
        pharos: {
          kind: 'pharos',
          room: 'santkitchen',
          className: pharosResponsive,
          colorStates: commonRoomColorStates,
        },
      },
    },
  },
};

export default SantKitchen;
