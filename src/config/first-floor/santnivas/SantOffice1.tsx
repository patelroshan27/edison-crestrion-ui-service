import { Lightbulb, LightbulbOff, Sun, SunDim } from 'lucide-react';
import { type UIConfig } from 'config/Configs';
import { commonRoomColorStates } from 'config/ConfigData';

const SantOffice1: UIConfig = {
  rooms: [
    { key: 'santoffice1', title: 'Office1' },
    { key: 'santoffice2', title: 'Office2' },
    { key: 'sarvasva', title: 'Sarvasva' },
    { key: 'bramhananad', title: 'Bramhananad' },
    { key: 'santcorridor', title: 'Corridor' },
    { key: 'santkitchen', title: 'Kitchen' },
  ],
  id: 123,
  authProviderURL: '/crestron/passcodes/validate',
  pharosApiPath: '/pharos/send',
  zumApiPath: '/zum/send',
  audioApiPath: '/audio/send',
  mediaApiPath: '/mediaplayer/send',
  authID: 'SantOffice1',
  crestronConfigs: {
    host: '10.25.20.73',
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
                  payloads: [{ room: 'santoffice1', scene: '1' }],
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
                  payloads: [{ room: 'santoffice1', scene: '2' }],
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
                  payloads: [{ room: 'santoffice1', scene: '3' }],
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
                  payloads: [{ room: 'santoffice1', scene: '16' }],
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
                  payloads: [{ room: 'santoffice1', scene: '2' }],
                },
                {
                  type: 'pharos',
                  payloads: [{ room: 'santoffice1', scene: '01' }],
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
                  payloads: [{ room: 'santoffice1', scene: '16' }],
                },
                {
                  type: 'pharos',
                  payloads: [{ room: 'santoffice1', scene: '00' }],
                },
              ],
            },
          ],
        },
        pharos: {
          kind: 'pharos',
          room: 'santoffice1',
          className: 'row-span-4 col-span-3 gap-16',
          colorStates: commonRoomColorStates,
        },
      },
    },
  },
};

export default SantOffice1;
