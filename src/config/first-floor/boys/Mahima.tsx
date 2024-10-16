import { Lightbulb, LightbulbOff, Sun, SunDim } from 'lucide-react';
import type { ApiCommand, UIConfig } from 'config/Configs';
import { commonRoomColorStates } from 'config/ConfigData';

const Mahima: UIConfig = {
  rooms: [],
  id: 123,
  authProviderURL: '/crestron/passcodes/validate',
  pharosApiPath: '/pharos/send',
  zumApiPath: '/zum/send',
  audioApiPath: '/audio/send',
  mediaApiPath: '/mediaplayer/send',
  authID: 'Mahima',
  pages: {
    LIGHTS: {
      name: 'Lights',
      icon: Sun,
      controls: {
        lights: {
          kind: 'group',
          className:
            'row-span-4 grid grid-cols-1 grid-rows-[1fr_1fr_1fr_1fr_1fr_1fr] gap-2',
          getActiveValue: (
            sendCommands: (commands: ApiCommand[]) => Promise<unknown[]>,
          ) => {
            return sendCommands([
              { type: 'zum', payloads: [{ room: 'mahima' }] },
            ]).then((results) => (results[0] as number).toString());
          },
          parseActiveValueKey: (cmd: ApiCommand) =>
            cmd.type === 'zum' ? (cmd.payloads[0].scene as string) : '',
          controls: [
            {
              kind: 'light',
              icon: Lightbulb,
              title: 'Lights',
              label: 'On',
              apiCommands: [
                { type: 'zum', payloads: [{ room: 'mahima', scene: '1' }] },
              ],
            },
            {
              kind: 'light',
              icon: Sun,
              title: 'Lights',
              label: 'Crown',
              apiCommands: [
                { type: 'zum', payloads: [{ room: 'mahima', scene: '2' }] },
              ],
            },
            {
              kind: 'light',
              icon: SunDim,
              title: 'Lights',
              label: 'Ceiling',
              apiCommands: [
                { type: 'zum', payloads: [{ room: 'mahima', scene: '3' }] },
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
                  payloads: [{ room: 'mahima', scene: '16' }],
                },
              ],
            },
            {
              kind: 'light',
              icon: Lightbulb,
              title: 'Lights',
              label: 'All On',
              apiCommands: [
                { type: 'zum', payloads: [{ room: 'mahima', scene: '1' }] },
                {
                  type: 'pharos',
                  payloads: [{ room: 'mahima', scene: '01' }],
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
                  payloads: [{ room: 'mahima', scene: '16' }],
                },
                {
                  type: 'pharos',
                  payloads: [{ room: 'mahima', scene: '00' }],
                },
              ],
            },
          ],
        },
        pharos: {
          kind: 'pharos',
          room: 'mahima',
          className: 'row-span-4 col-span-3',
          colorStates: commonRoomColorStates,
        },
      },
    },
  },
};

export default Mahima;
