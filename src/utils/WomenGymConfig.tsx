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
  authID: 'WomenGym',
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
              state: '151',
              webRelayConfig: {
                payload: { authId: 'WomenGym', name: 'leftHoop', action: 'UP' },
              },
            },
            {
              kind: 'toggle',
              icon: PauseOctagon,
              title: 'Left Hoop',
              label: 'Stop',
              state: '153',
              webRelayConfig: {
                payload: { authId: 'WomenGym', name: 'leftHoop', action: 'STOP' },
              },
            },
            {
              kind: 'toggle',
              icon: ArrowDownToLine,
              title: 'Left Hoop',
              label: 'Down',
              state: '155',
              webRelayConfig: {
                payload: { authId: 'WomenGym', name: 'leftHoop', action: 'DOWN' },
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
              state: '157',
              webRelayConfig: {
                payload: { authId: 'WomenGym', name: 'curtain', action: 'UP' },
              },
            },
            {
              kind: 'toggle',
              icon: PauseOctagon,
              title: 'Curtains',
              label: 'Stop',
              state: '159',
              webRelayConfig: {
                payload: { authId: 'WomenGym', name: 'curtain', action: 'STOP' },
              },
            },
            {
              kind: 'toggle',
              icon: ArrowDownToLine,
              title: 'Curtains',
              label: 'Down',
              state: '161',
              webRelayConfig: {
                payload: { authId: 'WomenGym', name: 'curtain', action: 'DOWN' },
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
              state: '163',
              webRelayConfig: {
                payload: { authId: 'WomenGym', name: 'rightHoop', action: 'UP' },
              },
            },
            {
              kind: 'toggle',
              icon: PauseOctagon,
              title: 'Right Hoop',
              label: 'Stop',
              state: '165',
              webRelayConfig: {
                payload: {
                  authId: 'WomenGym',
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
              state: '167',
              webRelayConfig: {
                payload: {
                  authId: 'WomenGym',
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
              state: '1',
              stateOff: '20',
              apiCommands: [
                { type: 'zum', payload: { room: '8B9288E9', scene: '1' } },
              ],
            },
            {
              kind: 'light',
              icon: Sun,
              title: 'Lights',
              label: 'Medium',
              state: '2',
              stateOff: '20',
              apiCommands: [
                { type: 'zum', payload: { room: '8B9288E9', scene: '2' } },
              ],
            },
            {
              kind: 'light',
              icon: SunDim,
              title: 'Lights',
              label: 'Low',
              state: '3',
              stateOff: '20',
              apiCommands: [
                { type: 'zum', payload: { room: '8B9288E9', scene: '3' } },
              ],
            },
            {
              kind: 'light',
              icon: LightbulbOff,
              title: 'Lights',
              label: 'Off',
              state: '20',
              apiCommands: [
                { type: 'zum', payload: { room: '8B9288E9', scene: '16' } },
              ],
            },
          ],
        }
      },
    },
  },
};

export default Configs;
