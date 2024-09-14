import {
  ArrowDownToLine,
  ArrowUpToLine,
  Lightbulb,
  LightbulbOff,
  PauseOctagon,
  Sun,
  SunDim,
} from 'lucide-react';
import type { UIConfig } from 'config/Configs';
import { commonRoomColorStates } from 'config/ConfigData';

const Yagnapurush: UIConfig = {
  rooms: [],
  id: 123,
  authProviderURL: '/crestron/passcodes/validate',
  pharosApiPath: '/pharos/send',
  zumApiPath: '/zum/send',
  audioApiPath: '/audio/send',
  mediaApiPath: '/mediaplayer/send',
  projectorApiPath: '/video/projector/send',
  authID: 'Yagnapurush',
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
                { type: 'zum', payloads: [{ room: 'yagnapurush', scene: '1' }] },
              ],
            },
            {
              kind: 'light',
              icon: Sun,
              title: 'Lights',
              label: 'Crown',
              apiCommands: [
                { type: 'zum', payloads: [{ room: 'yagnapurush', scene: '3' }] },
              ],
            },
            {
              kind: 'light',
              icon: SunDim,
              title: 'Lights',
              label: 'Ceiling',
              apiCommands: [
                { type: 'zum', payloads: [{ room: 'yagnapurush', scene: '2' }] },
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
                  payloads: [{ room: 'yagnapurush', scene: '16' }],
                },
              ],
            },
            {
              kind: 'light',
              icon: Lightbulb,
              title: 'Lights',
              label: 'All On',
              apiCommands: [
                { type: 'zum', payloads: [{ room: 'yagnapurush', scene: '1' }] },
                {
                  type: 'pharos',
                  payloads: [{ room: 'yagnapurush', scene: '01' }],
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
                  payloads: [{ room: 'yagnapurush', scene: '16' }],
                },
                {
                  type: 'pharos',
                  payloads: [{ room: 'yagnapurush', scene: '00' }],
                },
              ],
            },
          ],
        },
        pharos: {
          kind: 'pharos',
          room: 'yagnapurush',
          className: 'row-span-4 col-span-3',
          colorStates: commonRoomColorStates,
        },
      },
    },
    VIDEO: {
      name: 'Video',
      icon: Sun,
      controls: {
        projectors: {
          kind: 'group',
          className:
            'row-span-4 grid grid-cols-1 grid-rows-[1fr_1fr_1fr_1fr_1fr_1fr] gap-2',
          controls: [
            {
              kind: 'toggle',
              icon: Lightbulb,
              title: 'Projector',
              label: 'On',
              apiCommands: [
                {
                  type: 'projector',
                  payloads: [{ authId: 'Yagnapurush', action: 'poweron' }],
                },
              ],
            },
            {
              kind: 'toggle',
              icon: LightbulbOff,
              title: 'Projector',
              label: 'Off',
              apiCommands: [
                {
                  type: 'projector',
                  payloads: [{ authId: 'Yagnapurush', action: 'poweroff' }],
                },
              ],
            },
          ],
        },
        screens: {
          kind: 'group',
          className:
            'row-span-4 grid grid-cols-1 gap-2 grid-rows-[1fr_1fr_1fr]',
          controls: [
            {
              kind: 'toggle',
              icon: ArrowUpToLine,
              title: 'Screen',
              label: 'Up',
              apiCommands: [
                {
                  type: 'signal',
                  payload: { signalName: '31' },
                },
              ],
            },
            {
              kind: 'toggle',
              icon: PauseOctagon,
              title: 'Screen',
              label: 'Stop',
              apiCommands: [
                {
                  type: 'signal',
                  payload: { signalName: '32' },
                },
              ],
            },
            {
              kind: 'toggle',
              icon: ArrowDownToLine,
              title: 'Screen',
              label: 'Down',
              apiCommands: [
                {
                  type: 'signal',
                  payload: { signalName: '33' },
                },
              ],
            },
          ],
        },
      },
    },
  },
};

export default Yagnapurush;
