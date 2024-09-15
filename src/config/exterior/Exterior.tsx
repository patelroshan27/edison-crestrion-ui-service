import { Sun, ArrowUpToLine, PauseOctagon } from 'lucide-react';
import type { UIConfig } from 'config/Configs';

const Exterior: UIConfig = {
  rooms: [{ key: 'exterior', title: 'Exterior' }],
  id: 123,
  authProviderURL: '/crestron/passcodes/validate',
  webRelayApiPath: '/crestron/webrelays/send',
  zumApiPath: '/zum/send',
  authID: 'exterior',
  crestronConfigs: {
    host: '10.25.20.96',
    ipID: 19,
    port: 41794,
  },
  pages: {
    Lights: {
      name: 'Lights',
      icon: Sun,
      controls: {
        exteriorWoodbridge: {
          kind: 'group',
          className:
            'row-span-4 grid grid-cols-1 gap-2 grid-rows-[1fr_1fr_1fr]',
          controls: [
            {
              kind: 'toggle',
              icon: ArrowUpToLine,
              title: 'Exterior Woodbridge',
              label: 'On',
              webRelayConfig: {
                payload: {
                  authId: 'ExteriorWoodbridge',
                  name: 'woodbridgeSideLights',
                  action: 'ON',
                },
              },
            },
            {
              kind: 'toggle',
              icon: PauseOctagon,
              title: 'Exterior Woodbridge',
              label: 'Off',
              webRelayConfig: {
                payload: {
                  authId: 'ExteriorWoodbridge',
                  name: 'woodbridgeSideLights',
                  action: 'OFF',
                },
              },
            },
          ],
        },
        exteriorTurnpike: {
          kind: 'group',
          className:
            'row-span-4 grid grid-cols-1 gap-2 grid-rows-[1fr_1fr_1fr]',
          controls: [
            {
              kind: 'toggle',
              icon: ArrowUpToLine,
              title: 'Exterior Turnpike',
              label: 'On',
              webRelayConfig: {
                payload: {
                  authId: 'ExteriorTurnpike',
                  name: 'turnpikeSideLights',
                  action: 'ON',
                },
              },
            },
            {
              kind: 'toggle',
              icon: PauseOctagon,
              title: 'Exterior Turnpike',
              label: 'Off',
              webRelayConfig: {
                payload: {
                  authId: 'ExteriorTurnpike',
                  name: 'turnpikeSideLights',
                  action: 'OFF',
                },
              },
            },
          ],
        },
      },
    },
  },
};

export default Exterior;
