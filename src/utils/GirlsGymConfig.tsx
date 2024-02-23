import {
  Lightbulb,
  LightbulbOff,
  Sun,
  SunDim,
  ArrowUpToLine,
  PauseOctagon,
  ArrowDownToLine,
} from 'lucide-react';
import type { UIConfig } from 'utils/Configs';

const Configs: UIConfig = {
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
    'H&C': {
      name: 'Hoops & Curtains',
      icon: Sun,
      className: '!grid-cols-3',
      controls: {
        leftHoop: {
          kind: 'group',
          className: '!grid-rows-[1fr_1fr_1fr_1fr]',
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
          className: '!grid-rows-[1fr_1fr_1fr_1fr]',
          controls: [
            {
              kind: 'toggle',
              icon: ArrowUpToLine,
              title: 'Curtains',
              label: 'Up',
              webRelayConfig: {
                payload: { authId: 'GirlsGym', name: 'curtain', action: 'UP' },
              },
            },
            {
              kind: 'toggle',
              icon: PauseOctagon,
              title: 'Curtains',
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
              title: 'Curtains',
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
          className: '!grid-rows-[1fr_1fr_1fr_1fr]',
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
                { type: 'zum', payload: { room: '8B9288E9', scene: '1' } },
              ],
            },
            {
              kind: 'light',
              icon: Sun,
              title: 'Lights',
              label: 'Medium',
              apiCommands: [
                { type: 'zum', payload: { room: '8B9288E9', scene: '2' } },
              ],
            },
            {
              kind: 'light',
              icon: SunDim,
              title: 'Lights',
              label: 'Low',
              apiCommands: [
                { type: 'zum', payload: { room: '8B9288E9', scene: '3' } },
              ],
            },
            {
              kind: 'light',
              icon: LightbulbOff,
              title: 'Lights',
              label: 'Off',
              apiCommands: [
                { type: 'zum', payload: { room: '8B9288E9', scene: '16' } },
              ],
            },
          ],
        },
      },
    },
  },
};

export default Configs;
