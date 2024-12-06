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
import { lightControlResponsive, pageResponsive } from 'config/responsive';

const GirlsGym: UIConfig = {
  rooms: [{ key: 'girlsgym', title: 'GirlsGym' }],
  id: 123,
  // proximityActivity: '71',
  // touchActivity: '72',
  authProviderURL: '/crestron/passcodes/validate',
  webRelayApiPath: '/crestron/webrelays/send',
  zumApiPath: '/zum/send',
  authID: 'GirlsGym',
  crestronConfigs: {
    host: '10.25.20.97',
    ipID: 19,
    port: 41794,
  },
  pages: {
    LIGHTS: {
      name: 'Lights',
      className: pageResponsive,
      icon: Sun,
      controls: {
        lights: {
          kind: 'group',
          className: `row-span-4 grid grid-cols-1 grid-rows-[1fr_1fr_1fr_1fr] gap-2 ${lightControlResponsive}`,
          controls: [
            {
              kind: 'light',
              icon: Lightbulb,
              title: 'Lights',
              label: 'On',
              apiCommands: [
                { type: 'zum', payloads: [{ room: 'girlsgym', scene: '1' }] },
              ],
            },
            {
              kind: 'light',
              icon: Sun,
              title: 'Lights',
              label: 'Medium',
              apiCommands: [
                { type: 'zum', payloads: [{ room: 'girlsgym', scene: '2' }] },
              ],
            },
            {
              kind: 'light',
              icon: SunDim,
              title: 'Lights',
              label: 'Low',
              apiCommands: [
                { type: 'zum', payloads: [{ room: 'girlsgym', scene: '3' }] },
              ],
            },
            {
              kind: 'light',
              icon: LightbulbOff,
              title: 'Lights',
              label: 'Off',
              apiCommands: [
                { type: 'zum', payloads: [{ room: 'girlsgym', scene: '16' }] },
              ],
            },
          ],
        },
      },
    },
    'H&C': {
      name: 'Hoops & Curtain',
      className: pageResponsive,
      requiredRoles: ['Master', 'Admin'],
      icon: Sun,
      controls: {
        leftHoop: {
          kind: 'group',
          className:
            'row-span-4 grid grid-cols-1 gap-2 grid-rows-[1fr_1fr_1fr] mob:row-span-1 mob:row-span-1',
          controls: [
            {
              kind: 'toggle',
              icon: ArrowUpToLine,
              title: 'Left Hoop',
              label: 'Up',
              webRelayConfig: {
                payload: { authId: 'GirlsGym', name: 'leftHoop', action: 'UP' },
              },
            },
            {
              kind: 'toggle',
              icon: PauseOctagon,
              title: 'Left Hoop',
              label: 'Stop',
              webRelayConfig: {
                payload: {
                  authId: 'GirlsGym',
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
                  authId: 'GirlsGym',
                  name: 'leftHoop',
                  action: 'DOWN',
                },
              },
            },
          ],
        },
        curtains: {
          kind: 'group',
          className:
            'row-span-4 grid grid-cols-1 gap-2 grid-rows-[1fr_1fr_1fr] mob:row-span-1 mob:row-span-1',
          controls: [
            {
              kind: 'toggle',
              icon: ArrowUpToLine,
              title: 'Curtain',
              label: 'Up',
              webRelayConfig: {
                payload: { authId: 'GirlsGym', name: 'curtain', action: 'UP' },
              },
            },
            {
              kind: 'toggle',
              icon: PauseOctagon,
              title: 'Curtain',
              label: 'Stop',
              webRelayConfig: {
                payload: {
                  authId: 'GirlsGym',
                  name: 'curtain',
                  action: 'STOP',
                },
              },
            },
            {
              kind: 'toggle',
              icon: ArrowDownToLine,
              title: 'Curtain',
              label: 'Down',
              webRelayConfig: {
                payload: {
                  authId: 'GirlsGym',
                  name: 'curtain',
                  action: 'DOWN',
                },
              },
            },
          ],
        },
        rightHoop: {
          kind: 'group',
          className:
            'row-span-4 grid grid-cols-1 gap-2 grid-rows-[1fr_1fr_1fr] mob:row-span-1 mob:row-span-1',
          controls: [
            {
              kind: 'toggle',
              icon: ArrowUpToLine,
              title: 'Right Hoop',
              label: 'Up',
              webRelayConfig: {
                payload: {
                  authId: 'GirlsGym',
                  name: 'rightHoop',
                  action: 'UP',
                },
              },
            },
            {
              kind: 'toggle',
              icon: PauseOctagon,
              title: 'Right Hoop',
              label: 'Stop',
              webRelayConfig: {
                payload: {
                  authId: 'GirlsGym',
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
                  authId: 'GirlsGym',
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

export default GirlsGym;
