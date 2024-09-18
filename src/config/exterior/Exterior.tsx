import { Sun, ArrowUpToLine, PauseOctagon } from 'lucide-react';
import type {
  ApiCommand,
  UIConfig,
  WebrelayExteriorStatusRes,
} from 'config/Configs';

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
          getActiveValue: (
            sendCommands: (commands: ApiCommand[]) => Promise<unknown[]>,
          ) => {
            return sendCommands([
              {
                type: 'webrelay',
                payload: {
                  authId: 'ExteriorWoodbridge',
                  name: 'woodbridgeSideLights',
                  action: 'STATUS',
                },
              },
            ]).then((results) =>
              (results as WebrelayExteriorStatusRes[])[0].datavalues
                .relaystate[0] === '1'
                ? 'On'
                : 'Off',
            );
          },
          controls: [
            {
              kind: 'toggle',
              icon: ArrowUpToLine,
              title: 'Exterior Woodbridge',
              label: 'On',
              labelOff: 'Off',
              apiCommands: [
                {
                  type: 'webrelay',
                  payload: {
                    authId: 'ExteriorWoodbridge',
                    name: 'woodbridgeSideLights',
                    action: 'TOGGLE',
                  },
                },
              ],
            },
            {
              kind: 'toggle',
              icon: PauseOctagon,
              title: 'Exterior Woodbridge',
              label: 'Off',
              apiCommands: [
                {
                  type: 'webrelay',
                  payload: {
                    authId: 'ExteriorWoodbridge',
                    name: 'woodbridgeSideLights',
                    action: 'TOGGLE',
                  },
                },
              ],
            },
          ],
        },
        exteriorTurnpike: {
          kind: 'group',
          className:
            'row-span-4 grid grid-cols-1 gap-2 grid-rows-[1fr_1fr_1fr]',
          getActiveValue: (
            sendCommands: (commands: ApiCommand[]) => Promise<unknown[]>,
          ) => {
            return sendCommands([
              {
                type: 'webrelay',
                payload: {
                  authId: 'ExteriorTurnpike',
                  name: 'turnpikeSideLights',
                  action: 'STATUS',
                },
              },
            ]).then((results) =>
              (results as WebrelayExteriorStatusRes[])[0].datavalues
                .relaystate[0] === '1'
                ? 'On'
                : 'Off',
            );
          },
          controls: [
            {
              kind: 'toggle',
              icon: ArrowUpToLine,
              title: 'Exterior Turnpike',
              label: 'On',
              labelOff: 'Off',
              apiCommands: [
                {
                  type: 'webrelay',
                  payload: {
                    authId: 'ExteriorTurnpike',
                    name: 'turnpikeSideLights',
                    action: 'TOGGLE',
                  },
                },
              ],
            },
            {
              kind: 'toggle',
              icon: PauseOctagon,
              title: 'Exterior Turnpike',
              label: 'Off',
              apiCommands: [
                {
                  type: 'webrelay',
                  payload: {
                    authId: 'ExteriorTurnpike',
                    name: 'turnpikeSideLights',
                    action: 'TOGGLE',
                  },
                },
              ],
            },
          ],
        },
      },
    },
  },
};

export default Exterior;
