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
          className:
            'row-span-4 grid grid-cols-1 grid-rows-[1fr_1fr_1fr_1fr_1fr_1fr] gap-2',
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
                    { room: 'sarvasva', scene: '1' },
                    { room: 'santcorridor', scene: '1' },
                    { room: 'santkitchen', scene: '1' },
                    { room: 'bramhanand', scene: '1' },
                    { room: 'santoffice2', scene: '1' },
                    { room: 'santoffice1', scene: '1' },
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
                    { room: 'sarvasva', scene: '2' },
                    { room: 'santcorridor', scene: '2' },
                    { room: 'santkitchen', scene: '2' },
                    { room: 'bramhanand', scene: '2' },
                    { room: 'santoffice2', scene: '2' },
                    { room: 'santoffice1', scene: '2' },
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
                    { room: 'sarvasva', scene: '3' },
                    { room: 'santcorridor', scene: '3' },
                    { room: 'santkitchen', scene: '3' },
                    { room: 'bramhanand', scene: '3' },
                    { room: 'santoffice2', scene: '3' },
                    { room: 'santoffice1', scene: '3' },
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
                    { room: 'sarvasva', scene: '16' },
                    { room: 'santcorridor', scene: '16' },
                    { room: 'santkitchen', scene: '16' },
                    { room: 'bramhanand', scene: '16' },
                    { room: 'santoffice2', scene: '16' },
                    { room: 'santoffice1', scene: '16' },
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
                    { room: 'sarvasva', scene: '2' },
                    { room: 'santcorridor', scene: '2' },
                    { room: 'santkitchen', scene: '2' },
                    { room: 'bramhanand', scene: '2' },
                    { room: 'santoffice2', scene: '2' },
                    { room: 'santoffice1', scene: '2' },
                  ],
                },
                {
                  type: 'pharos',
                  payloads: [
                    { room: 'sarvasva', scene: '01' },
                    { room: 'santcorridor', scene: '01' },
                    { room: 'santkitchen', scene: '01' },
                    { room: 'bramhanand', scene: '01' },
                    { room: 'santoffice2', scene: '01' },
                    { room: 'santoffice1', scene: '01' },
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
                    { room: 'sarvasva', scene: '16' },
                    { room: 'santcorridor', scene: '16' },
                    { room: 'santkitchen', scene: '16' },
                    { room: 'bramhanand', scene: '16' },
                    { room: 'santoffice2', scene: '16' },
                    { room: 'santoffice1', scene: '16' },
                  ],
                },
                {
                  type: 'pharos',
                  payloads: [
                    { room: 'sarvasva', scene: '00' },
                    { room: 'santcorridor', scene: '00' },
                    { room: 'santkitchen', scene: '00' },
                    { room: 'bramhanand', scene: '00' },
                    { room: 'santoffice2', scene: '00' },
                    { room: 'santoffice1', scene: '00' },
                  ],
                },
              ],
            },
          ],
        },
        pharos: {
          kind: 'pharos',
          room: 'sarvasva',
          className: 'row-span-4 col-span-3 gap-16',
          colorStates: [
            {
              name: 'Off',
              color: 'rgba(255,255,255,0.1)',
              icon: PowerOff,
              scene: '00',
              extraPayloads: [
                { room: 'santcorridor', scene: '00' },
                { room: 'santkitchen', scene: '00' },
                { room: 'bramhanand', scene: '00' },
                { room: 'santoffice2', scene: '00' },
                { room: 'santoffice1', scene: '00' },
              ],
            },
            {
              name: 'Light Orange',
              color: 'rgb(225,169,104)',
              scene: '01',
              extraPayloads: [
                { room: 'santcorridor', scene: '01' },
                { room: 'santkitchen', scene: '01' },
                { room: 'bramhanand', scene: '01' },
                { room: 'santoffice2', scene: '01' },
                { room: 'santoffice1', scene: '01' },
              ],
            },
            {
              name: 'Dark Orange',
              color: 'rgb(196,100,0)',
              scene: '02',
              extraPayloads: [
                { room: 'santcorridor', scene: '02' },
                { room: 'santkitchen', scene: '02' },
                { room: 'bramhanand', scene: '02' },
                { room: 'santoffice2', scene: '02' },
                { room: 'santoffice1', scene: '02' },
              ],
            },
            {
              name: 'Blue',
              color: 'rgb(2,0,255)',
              scene: '03',
              extraPayloads: [
                { room: 'santcorridor', scene: '03' },
                { room: 'santkitchen', scene: '03' },
                { room: 'bramhanand', scene: '03' },
                { room: 'santoffice2', scene: '03' },
                { room: 'santoffice1', scene: '03' },
              ],
            },
            {
              name: 'Gold',
              color: 'rgb(166,156,0)',
              scene: '04',
              extraPayloads: [
                { room: 'santcorridor', scene: '04' },
                { room: 'santkitchen', scene: '04' },
                { room: 'bramhanand', scene: '04' },
                { room: 'santoffice2', scene: '04' },
                { room: 'santoffice1', scene: '04' },
              ],
            },
            {
              name: 'Yellow',
              color: 'rgb(225,220,114)',
              scene: '05',
              extraPayloads: [
                { room: 'santcorridor', scene: '05' },
                { room: 'santkitchen', scene: '05' },
                { room: 'bramhanand', scene: '05' },
                { room: 'santoffice2', scene: '05' },
                { room: 'santoffice1', scene: '05' },
              ],
            },
            {
              name: 'Bright Red',
              color: 'rgb(252,86,86)',
              scene: '06',
              extraPayloads: [
                { room: 'santcorridor', scene: '06' },
                { room: 'santkitchen', scene: '06' },
                { room: 'bramhanand', scene: '06' },
                { room: 'santoffice2', scene: '06' },
                { room: 'santoffice1', scene: '06' },
              ],
            },
            {
              name: 'Purple',
              color: 'rgb(171,145,248)',
              scene: '07',
              extraPayloads: [
                { room: 'santcorridor', scene: '07' },
                { room: 'santkitchen', scene: '07' },
                { room: 'bramhanand', scene: '07' },
                { room: 'santoffice2', scene: '07' },
                { room: 'santoffice1', scene: '07' },
              ],
            },
            {
              name: 'Dark Green',
              color: 'rgb(54,143,15)',
              scene: '08',
              extraPayloads: [
                { room: 'santcorridor', scene: '08' },
                { room: 'santkitchen', scene: '08' },
                { room: 'bramhanand', scene: '08' },
                { room: 'santoffice2', scene: '08' },
                { room: 'santoffice1', scene: '08' },
              ],
            },
            {
              name: 'Sky Blue',
              color: 'rgb(141,238,255)',
              scene: '09',
              extraPayloads: [
                { room: 'santcorridor', scene: '09' },
                { room: 'santkitchen', scene: '09' },
                { room: 'bramhanand', scene: '09' },
                { room: 'santoffice2', scene: '09' },
                { room: 'santoffice1', scene: '09' },
              ],
            },
            {
              name: 'White',
              color: 'rgb(255,255,255)',
              scene: '10',
              extraPayloads: [
                { room: 'santcorridor', scene: '10' },
                { room: 'santkitchen', scene: '10' },
                { room: 'bramhanand', scene: '10' },
                { room: 'santoffice2', scene: '10' },
                { room: 'santoffice1', scene: '10' },
              ],
            },
            {
              name: 'Mint',
              color: 'rgb(40,162,125)',
              scene: '11',
              extraPayloads: [
                { room: 'santcorridor', scene: '11' },
                { room: 'santkitchen', scene: '11' },
                { room: 'bramhanand', scene: '11' },
                { room: 'santoffice2', scene: '11' },
                { room: 'santoffice1', scene: '11' },
              ],
            },
            {
              name: 'Dark Pink',
              color: 'rgb(248,82,143)',
              scene: '12',
              extraPayloads: [
                { room: 'santcorridor', scene: '12' },
                { room: 'santkitchen', scene: '12' },
                { room: 'bramhanand', scene: '12' },
                { room: 'santoffice2', scene: '12' },
                { room: 'santoffice1', scene: '12' },
              ],
            },
            {
              name: 'Red',
              color: 'rgb(219,0,22)',
              scene: '13',
              extraPayloads: [
                { room: 'santcorridor', scene: '13' },
                { room: 'santkitchen', scene: '13' },
                { room: 'bramhanand', scene: '13' },
                { room: 'santoffice2', scene: '13' },
                { room: 'santoffice1', scene: '13' },
              ],
            },
            {
              name: 'Dark Purple',
              color: 'rgb(63,13,100)',
              scene: '14',
              extraPayloads: [
                { room: 'santcorridor', scene: '14' },
                { room: 'santkitchen', scene: '14' },
                { room: 'bramhanand', scene: '14' },
                { room: 'santoffice2', scene: '14' },
                { room: 'santoffice1', scene: '14' },
              ],
            },
            {
              name: 'Dark Yellow',
              color: 'rgb(255,185,29)',
              scene: '15',
              extraPayloads: [
                { room: 'santcorridor', scene: '15' },
                { room: 'santkitchen', scene: '15' },
                { room: 'bramhanand', scene: '15' },
                { room: 'santoffice2', scene: '15' },
                { room: 'santoffice1', scene: '15' },
              ],
            },
            {
              name: 'Dark Brown',
              color: 'rgb(83,37,0)',
              scene: '16',
              extraPayloads: [
                { room: 'santcorridor', scene: '16' },
                { room: 'santkitchen', scene: '16' },
                { room: 'bramhanand', scene: '16' },
                { room: 'santoffice2', scene: '16' },
                { room: 'santoffice1', scene: '16' },
              ],
            },
            {
              name: 'Grey',
              color: 'rgb(143,136,136)',
              scene: '17',
              extraPayloads: [
                { room: 'santcorridor', scene: '17' },
                { room: 'santkitchen', scene: '17' },
                { room: 'bramhanand', scene: '17' },
                { room: 'santoffice2', scene: '17' },
                { room: 'santoffice1', scene: '17' },
              ],
            },
            {
              name: 'Dark Red',
              color: 'rgb(108,12,12)',
              scene: '18',
              extraPayloads: [
                { room: 'santcorridor', scene: '18' },
                { room: 'santkitchen', scene: '18' },
                { room: 'bramhanand', scene: '18' },
                { room: 'santoffice2', scene: '18' },
                { room: 'santoffice1', scene: '18' },
              ],
            },
            {
              name: 'Dark Pink',
              color: 'rgb(252, 7, 234)',
              scene: '19',
              extraPayloads: [
                { room: 'santcorridor', scene: '19' },
                { room: 'santkitchen', scene: '19' },
                { room: 'bramhanand', scene: '19' },
                { room: 'santoffice2', scene: '19' },
                { room: 'santoffice1', scene: '19' },
              ],
            },
          ],
        },
      },
    },
  },
};

export default Configs;
