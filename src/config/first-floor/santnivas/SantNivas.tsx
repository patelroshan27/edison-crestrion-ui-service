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

const Configs: UIConfig = {
  rooms: [
    { key: 'sarvasva', title: 'Sarvasva' },
    { key: 'santoffice1', title: 'Sant Office1' },
    { key: 'santoffice2', title: 'Sant Office2' },
    { key: 'branhamanad', title: 'Branhamanad' },
    { key: 'santcorridor', title: 'Sant Corridor' },
    { key: 'santkitchen', title: 'Sant Kitchen' },
  ],
  id: 123,
  authProviderURL: '/crestron/passcodes/validate',
  pharosApiPath: '/pharos/send',
  zumApiPath: '/zum/send',
  audioApiPath: '/audio/send',
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
              apiCommands: [
                {
                  type: 'zum',
                  payloads: [
                    { room: '154', scene: '1' },
                    { room: '157', scene: '1' },
                    { room: '170', scene: '1' },
                    { room: '172', scene: '1' },
                    { room: '177', scene: '1' },
                    { room: '178', scene: '1' },
                  ],
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
                  payloads: [
                    { room: '154', scene: '2' },
                    { room: '157', scene: '2' },
                    { room: '170', scene: '2' },
                    { room: '172', scene: '2' },
                    { room: '177', scene: '2' },
                    { room: '178', scene: '2' },
                  ],
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
                  payloads: [
                    { room: '154', scene: '3' },
                    { room: '157', scene: '3' },
                    { room: '170', scene: '3' },
                    { room: '172', scene: '3' },
                    { room: '177', scene: '3' },
                    { room: '178', scene: '3' },
                  ],
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
                  payloads: [
                    { room: '154', scene: '16' },
                    { room: '157', scene: '16' },
                    { room: '170', scene: '16' },
                    { room: '172', scene: '16' },
                    { room: '177', scene: '16' },
                    { room: '178', scene: '16' },
                  ],
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
                  payloads: [
                    { room: '154', scene: '2' },
                    { room: '157', scene: '2' },
                    { room: '170', scene: '2' },
                    { room: '172', scene: '2' },
                    { room: '177', scene: '2' },
                    { room: '178', scene: '2' },
                  ],
                },
                {
                  type: 'pharos',
                  payloads: [
                    { room: '154', scene: '01' },
                    { room: '157', scene: '01' },
                    { room: '170', scene: '01' },
                    { room: '172', scene: '01' },
                    { room: '177', scene: '01' },
                    { room: '178', scene: '01' },
                  ],
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
                  payloads: [
                    { room: '154', scene: '16' },
                    { room: '157', scene: '16' },
                    { room: '170', scene: '16' },
                    { room: '172', scene: '16' },
                    { room: '177', scene: '16' },
                    { room: '178', scene: '16' },
                  ],
                },
                {
                  type: 'pharos',
                  payloads: [
                    { room: '154', scene: '00' },
                    { room: '157', scene: '00' },
                    { room: '170', scene: '00' },
                    { room: '172', scene: '00' },
                    { room: '177', scene: '00' },
                    { room: '178', scene: '00' },
                  ],
                },
              ],
            },
          ],
        },
      },
    },
  },
};

export default Configs;
