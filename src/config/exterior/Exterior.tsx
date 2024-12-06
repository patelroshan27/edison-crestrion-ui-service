import { Sun, LightbulbIcon, LightbulbOffIcon } from 'lucide-react';
import type {
  ApiCommand,
  UIConfig,
  WebrelayExteriorStatusRes,
} from 'config/Configs';
import { getWebrelayToggleCmd } from 'config/webrelayConfigUtils';
import { flexResponsive } from 'config/responsive';

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
      className: flexResponsive,
      icon: Sun,
      controls: {
        exteriorWoodbridge: {
          kind: 'apiToggle',
          getActiveState: (
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
            ]).then(
              (results) =>
                (results as WebrelayExteriorStatusRes[])[0].datavalues
                  .relaystate[0] === '1',
            );
          },
          onApiCommands: [
            getWebrelayToggleCmd({
              authId: 'ExteriorWoodbridge',
              name: 'woodbridgeSideLights',
            }),
          ],
          icon: LightbulbIcon,
          iconOff: LightbulbOffIcon,
          title: 'Exterior Woodbridge',
          label: 'On',
          labelOff: 'Off',
        },
        exteriorTurnpike: {
          kind: 'apiToggle',
          getActiveState: (
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
            ]).then(
              (results) =>
                (results as WebrelayExteriorStatusRes[])[0].datavalues
                  .relaystate[0] === '1',
            );
          },
          onApiCommands: [
            getWebrelayToggleCmd({
              authId: 'ExteriorTurnpike',
              name: 'turnpikeSideLights',
            }),
          ],
          icon: LightbulbIcon,
          iconOff: LightbulbOffIcon,
          title: 'Exterior Turnpike',
          label: 'On',
          labelOff: 'Off',
        },
      },
    },
  },
};

export default Exterior;
