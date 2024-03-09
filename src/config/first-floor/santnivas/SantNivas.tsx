import { Lightbulb, LightbulbOff, PowerOff, Sun, SunDim } from 'lucide-react';
import type { UIConfig } from 'config/Configs';

const Configs: UIConfig = {
  rooms: [],
  id: 123,
  authProviderURL: '/crestron/passcodes/validate',
  pharosApiPath: '/pharos/send',
  zumApiPath: '/zum/send',
  audioApiPath: '/audio/send',
  authID: 'SantNivas',
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
        pharos: {
          kind: 'pharos',
          room: '154',
          colorStates: [
            {
              name: 'Off',
              color: 'rgba(255,255,255,0.1)',
              icon: PowerOff,
              scene: '00',
              extraPayloads: [
                { room: '157', scene: '00' },
                { room: '170', scene: '00' },
                { room: '172', scene: '00' },
                { room: '177', scene: '00' },
                { room: '178', scene: '00' },
              ],
            },
            {
              name: 'Light Orange',
              color: 'rgb(225,169,104)',
              scene: '01',
              extraPayloads: [
                { room: '157', scene: '01' },
                { room: '170', scene: '01' },
                { room: '172', scene: '01' },
                { room: '177', scene: '01' },
                { room: '178', scene: '01' },
              ],
            },
            {
              name: 'Dark Orange',
              color: 'rgb(196,100,0)',
              scene: '02',
              extraPayloads: [
                { room: '157', scene: '02' },
                { room: '170', scene: '02' },
                { room: '172', scene: '02' },
                { room: '177', scene: '02' },
                { room: '178', scene: '02' },
              ],
            },
            {
              name: 'Blue',
              color: 'rgb(2,0,255)',
              scene: '03',
              extraPayloads: [
                { room: '157', scene: '03' },
                { room: '170', scene: '03' },
                { room: '172', scene: '03' },
                { room: '177', scene: '03' },
                { room: '178', scene: '03' },
              ],
            },
            {
              name: 'Gold',
              color: 'rgb(166,156,0)',
              scene: '04',
              extraPayloads: [
                { room: '157', scene: '04' },
                { room: '170', scene: '04' },
                { room: '172', scene: '04' },
                { room: '177', scene: '04' },
                { room: '178', scene: '04' },
              ],
            },
            {
              name: 'Yellow',
              color: 'rgb(225,220,114)',
              scene: '05',
              extraPayloads: [
                { room: '157', scene: '05' },
                { room: '170', scene: '05' },
                { room: '172', scene: '05' },
                { room: '177', scene: '05' },
                { room: '178', scene: '05' },
              ],
            },
            {
              name: 'Bright Red',
              color: 'rgb(252,86,86)',
              scene: '06',
              extraPayloads: [
                { room: '157', scene: '06' },
                { room: '170', scene: '06' },
                { room: '172', scene: '06' },
                { room: '177', scene: '06' },
                { room: '178', scene: '06' },
              ],
            },
            {
              name: 'Purple',
              color: 'rgb(171,145,248)',
              scene: '07',
              extraPayloads: [
                { room: '157', scene: '07' },
                { room: '170', scene: '07' },
                { room: '172', scene: '07' },
                { room: '177', scene: '07' },
                { room: '178', scene: '07' },
              ],
            },
            {
              name: 'Dark Green',
              color: 'rgb(54,143,15)',
              scene: '08',
              extraPayloads: [
                { room: '157', scene: '08' },
                { room: '170', scene: '08' },
                { room: '172', scene: '08' },
                { room: '177', scene: '08' },
                { room: '178', scene: '08' },
              ],
            },
            {
              name: 'Sky Blue',
              color: 'rgb(141,238,255)',
              scene: '09',
              extraPayloads: [
                { room: '157', scene: '09' },
                { room: '170', scene: '09' },
                { room: '172', scene: '09' },
                { room: '177', scene: '09' },
                { room: '178', scene: '09' },
              ],
            },
            {
              name: 'White',
              color: 'rgb(255,255,255)',
              scene: '10',
              extraPayloads: [
                { room: '157', scene: '10' },
                { room: '170', scene: '10' },
                { room: '172', scene: '10' },
                { room: '177', scene: '10' },
                { room: '178', scene: '10' },
              ],
            },
            {
              name: 'Mint',
              color: 'rgb(40,162,125)',
              scene: '11',
              extraPayloads: [
                { room: '157', scene: '11' },
                { room: '170', scene: '11' },
                { room: '172', scene: '11' },
                { room: '177', scene: '11' },
                { room: '178', scene: '11' },
              ],
            },
            {
              name: 'Dark Pink',
              color: 'rgb(248,82,143)',
              scene: '12',
              extraPayloads: [
                { room: '157', scene: '12' },
                { room: '170', scene: '12' },
                { room: '172', scene: '12' },
                { room: '177', scene: '12' },
                { room: '178', scene: '12' },
              ],
            },
            {
              name: 'Red',
              color: 'rgb(219,0,22)',
              scene: '13',
              extraPayloads: [
                { room: '157', scene: '13' },
                { room: '170', scene: '13' },
                { room: '172', scene: '13' },
                { room: '177', scene: '13' },
                { room: '178', scene: '13' },
              ],
            },
            {
              name: 'Dark Purple',
              color: 'rgb(63,13,100)',
              scene: '14',
              extraPayloads: [
                { room: '157', scene: '14' },
                { room: '170', scene: '14' },
                { room: '172', scene: '14' },
                { room: '177', scene: '14' },
                { room: '178', scene: '14' },
              ],
            },
            {
              name: 'Dark Yellow',
              color: 'rgb(255,185,29)',
              scene: '15',
              extraPayloads: [
                { room: '157', scene: '15' },
                { room: '170', scene: '15' },
                { room: '172', scene: '15' },
                { room: '177', scene: '15' },
                { room: '178', scene: '15' },
              ],
            },
            {
              name: 'Dark Brown',
              color: 'rgb(83,37,0)',
              scene: '16',
              extraPayloads: [
                { room: '157', scene: '16' },
                { room: '170', scene: '16' },
                { room: '172', scene: '16' },
                { room: '177', scene: '16' },
                { room: '178', scene: '16' },
              ],
            },
            {
              name: 'Grey',
              color: 'rgb(143,136,136)',
              scene: '17',
              extraPayloads: [
                { room: '157', scene: '17' },
                { room: '170', scene: '17' },
                { room: '172', scene: '17' },
                { room: '177', scene: '17' },
                { room: '178', scene: '17' },
              ],
            },
            {
              name: 'Dark Red',
              color: 'rgb(108,12,12)',
              scene: '18',
              extraPayloads: [
                { room: '157', scene: '18' },
                { room: '170', scene: '18' },
                { room: '172', scene: '18' },
                { room: '177', scene: '18' },
                { room: '178', scene: '18' },
              ],
            },
            {
              name: 'Dark Pink',
              color: 'rgb(252, 7, 234)',
              scene: '19',
              extraPayloads: [
                { room: '157', scene: '19' },
                { room: '170', scene: '19' },
                { room: '172', scene: '19' },
                { room: '177', scene: '19' },
                { room: '178', scene: '19' },
              ],
            },
          ],
        },
      },
    },
  },
};

export default Configs;
