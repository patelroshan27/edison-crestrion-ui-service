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
  authProviderURL: 'http://10.25.20.40:4000/crestron/passcodes/validate',
  webRelayURL: 'http://10.25.20.40:4000/crestron/webrelays/send',
  authID: 'MenGym',
  crestronConfigs: {
    host: '10.25.20.81',
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
                payload: { authId: 'MenGym', name: 'leftHoop', action: 'UP' },
              },
            },
            {
              kind: 'toggle',
              icon: PauseOctagon,
              title: 'Left Hoop',
              label: 'Stop',
              state: '153',
              webRelayConfig: {
                payload: { authId: 'MenGym', name: 'leftHoop', action: 'STOP' },
              },
            },
            {
              kind: 'toggle',
              icon: ArrowDownToLine,
              title: 'Left Hoop',
              label: 'Down',
              state: '155',
              webRelayConfig: {
                payload: { authId: 'MenGym', name: 'leftHoop', action: 'DOWN' },
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
                payload: { authId: 'MenGym', name: 'curtain', action: 'UP' },
              },
            },
            {
              kind: 'toggle',
              icon: PauseOctagon,
              title: 'Curtains',
              label: 'Stop',
              state: '159',
              webRelayConfig: {
                payload: { authId: 'MenGym', name: 'curtain', action: 'STOP' },
              },
            },
            {
              kind: 'toggle',
              icon: ArrowDownToLine,
              title: 'Curtains',
              label: 'Down',
              state: '161',
              webRelayConfig: {
                payload: { authId: 'MenGym', name: 'curtain', action: 'DOWN' },
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
                payload: { authId: 'MenGym', name: 'rightHoop', action: 'UP' },
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
                  authId: 'MenGym',
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
                  authId: 'MenGym',
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
            },
            {
              kind: 'light',
              icon: Sun,
              title: 'Lights',
              label: 'Medium',
              state: '2',
              stateOff: '20',
            },
            {
              kind: 'light',
              icon: SunDim,
              title: 'Lights',
              label: 'Low',
              state: '3',
              stateOff: '20',
            },
            {
              kind: 'light',
              icon: LightbulbOff,
              title: 'Lights',
              label: 'Off',
              state: '20',
            },
            {
              kind: 'light',
              icon: Lightbulb,
              title: 'Lights',
              label: 'All On',
              state: '18',
              stateOff: '20',
            },
            {
              kind: 'light',
              icon: LightbulbOff,
              title: 'Lights',
              label: 'All Off',
              state: '19',
              stateOff: '20',
            },
          ],
        },
      },
    },
  },
};

export default Configs;
