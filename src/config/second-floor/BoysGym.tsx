import {
  Lightbulb,
  LightbulbOff,
  Sun,
  SunDim,
  ArrowUpToLine,
  PauseOctagon,
  ArrowDownToLine,
} from 'lucide-react';
import type { UIConfig } from 'config/Configs';

const BoysGym: UIConfig = {
  rooms: [    { key: 'boysgym', title: 'BoysGym' },
  ],
  id: 123,
  // proximityActivity: '71',
  // touchActivity: '72',
  authProviderURL: '/crestron/passcodes/validate',
  webRelayApiPath: '/crestron/webrelays/send',
  zumApiPath: '/zum/send',
  authID: 'BoysGym',
  crestronConfigs: {
    host: '10.25.20.96',
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
          'row-span-4 grid grid-cols-1 grid-rows-[1fr_1fr_1fr_1fr] gap-2',
          controls: [
            {
              kind: 'light',
              icon: Lightbulb,
              title: 'Lights',
              label: 'On',
              apiCommands: [
                { type: 'zum', payloads: [{ room: 'boysgym', scene: '1' }] },
              ],
            },
            {
              kind: 'light',
              icon: Sun,
              title: 'Lights',
              label: 'Medium',
              apiCommands: [
                { type: 'zum', payloads: [{ room: 'boysgym', scene: '2' }] },
              ],
            },
            {
              kind: 'light',
              icon: SunDim,
              title: 'Lights',
              label: 'Low',
              apiCommands: [
                { type: 'zum', payloads: [{ room: 'boysgym', scene: '3' }] },
              ],
            },
            {
              kind: 'light',
              icon: LightbulbOff,
              title: 'Lights',
              label: 'Off',
              apiCommands: [
                { type: 'zum', payloads: [{ room: 'boysgym', scene: '16' }] },
              ],
            },
          ],
        },
      },
    },
    'H&C': {
      name: 'Hoops & Curtain',
      requiredRoles: ['sant', 'admin'],
      icon: Sun,
      controls: {
        leftHoop: {
          kind: 'group',
          className: 'row-span-4 grid grid-cols-1 gap-2 grid-rows-[1fr_1fr_1fr]',
          controls: [
            {
              kind: 'toggle',
              icon: ArrowUpToLine,
              title: 'Left Hoop',
              label: 'Up',
              webRelayConfig: {
                payload: { authId: 'BoysGym', name: 'leftHoop', action: 'UP' },
              },
            },
            {
              kind: 'toggle',
              icon: PauseOctagon,
              title: 'Left Hoop',
              label: 'Stop',
              webRelayConfig: {
                payload: {
                  authId: 'BoysGym',
                  name: 'leftHoop',
                  action: 'STOP',
                },
              },
            },
            {
              kind: 'toggle',
              icon: ArrowDownToLine,
              title: 'Left Hoop',
              label: 'Down',
              webRelayConfig: {
                payload: {
                  authId: 'BoysGym',
                  name: 'leftHoop',
                  action: 'DOWN',
                },
              },
            },
          ],
        },
        curtains: {
          kind: 'group',
          className: 'row-span-4 grid grid-cols-1 gap-2 grid-rows-[1fr_1fr_1fr]',
          controls: [
            {
              kind: 'toggle',
              icon: ArrowUpToLine,
              title: 'Curtain',
              label: 'Up',
              webRelayConfig: {
                payload: { authId: 'BoysGym', name: 'curtain', action: 'UP' },
              },
            },
            {
              kind: 'toggle',
              icon: PauseOctagon,
              title: 'Curtain',
              label: 'Stop',
              webRelayConfig: {
                payload: { authId: 'BoysGym', name: 'curtain', action: 'STOP' },
              },
            },
            {
              kind: 'toggle',
              icon: ArrowDownToLine,
              title: 'Curtain',
              label: 'Down',
              webRelayConfig: {
                payload: { authId: 'BoysGym', name: 'curtain', action: 'DOWN' },
              },
            },
          ],
        },
        rightHoop: {
          kind: 'group',
          className: 'row-span-4 grid grid-cols-1 gap-2 grid-rows-[1fr_1fr_1fr]',
          controls: [
            {
              kind: 'toggle',
              icon: ArrowUpToLine,
              title: 'Right Hoop',
              label: 'Up',
              webRelayConfig: {
                payload: { authId: 'BoysGym', name: 'rightHoop', action: 'UP' },
              },
            },
            {
              kind: 'toggle',
              icon: PauseOctagon,
              title: 'Right Hoop',
              label: 'Stop',
              webRelayConfig: {
                payload: {
                  authId: 'BoysGym',
                  name: 'rightHoop',
                  action: 'STOP',
                },
              },
            },
            {
              kind: 'toggle',
              icon: ArrowDownToLine,
              title: 'Right Hoop',
              label: 'Down',
              webRelayConfig: {
                payload: {
                  authId: 'BoysGym',
                  name: 'rightHoop',
                  action: 'DOWN',
                },
              },
            },
          ],
        },
      },
    },
  },
};

export default BoysGym;
