import {
  type MediaPlayerCmd,
  type MuseApiCmdType,
} from 'component/media/hooks';
import { type ApiCommand, CONFIGS } from 'config/Configs';
import moment from 'moment';

export const MONTHS = moment.months().map((label, index) => ({
  label,
  number: index + 1,
}));

export const DAYS_OF_WEEK = moment.weekdays().map((label, index) => ({
  label,
  number: index,
}));

export const MINUTES = Array.from({ length: 60 }, (_, i) => i);
export const HOURS = Array.from({ length: 24 }, (_, i) => i);
export const DAYS_OF_MONTH = Array.from({ length: 31 }, (_, i) => i + 1);

export interface JobActionItem {
  id: string;
  authID: string;
  target: string;
  label: string;
  commands: ApiCommand[];
}

const CONTROLS = Object.values(CONFIGS)
  .filter((c) => c.authID !== 'Master')
  .flatMap((config) => {
    return Object.values(config.pages).map((p) => ({
      authID: config.authID,
      ...p,
    }));
  })
  .flatMap((pageData) => {
    return Object.values(pageData.controls).map((c) => ({
      authID: pageData.authID,
      ...c,
    }));
  })
  .flatMap((control) => {
    if (control.kind === 'group') {
      return Object.values(control.controls).map((c) => ({
        authID: control.authID,
        ...c,
      }));
    } else {
      return [control];
    }
  });
const getActions = (): JobActionItem[] => {
  const lightAndToggleCommands = CONTROLS.flatMap((control) => {
    if (control.kind === 'light' || control.kind === 'toggle') {
      return {
        authID: control.authID,
        target: control.title,
        label: control.label,
        commands: control.apiCommands,
      };
    }

    return [];
  });

  const pharosCommands = CONTROLS.flatMap((control) => {
    if (control.kind === 'pharos') {
      return control.colorStates.map((cs) => ({
        authID: control.authID,
        target: 'Pharos Lights',
        label: cs.name,
        commands: [
          {
            type: 'pharos',
            payloads: [{ room: control.room, scene: cs.scene }].concat(
              cs.extraPayloads ?? [],
            ),
          },
        ],
      }));
    }

    return [];
  });

  return [...lightAndToggleCommands, ...pharosCommands].map((command, i) => ({
    ...command,
    id: `${command.authID ?? 'NoAuthID'}:${command.target ?? 'NoTarget'}:${
      command.label
    }:${i}`,
  })) as JobActionItem[];
};

export const JOB_ACTIONS = getActions();
export const JOB_ACTIONS_MAP = new Map(JOB_ACTIONS.map((x) => [x.id, x]));

// media player related
export const MEDIA_PLAYERS = CONTROLS.flatMap((control) => {
  if (control.kind === 'mediaPlayer') {
    return [{ authID: control.authID, playerId: control.playerId }];
  }
  return [];
});

export type SelectedApiCmdType = Extract<
  MuseApiCmdType,
  'addToPlayer' | 'clearPlayer' | 'repeat' | 'shuffle'
>;
export const MEDIA_PLAYER_ACTION_TYPES: Array<{
  id: string;
  type: SelectedApiCmdType;
  label: string;
  options: MediaPlayerCmd['payload'];
}> = (
  [
    {
      type: 'addToPlayer',
      label: 'Add to Queue',
      options: { append: 'ON' },
    },
    {
      type: 'repeat',
      label: 'Repeat All',
      options: { repeat: 'ALL' },
    },
    {
      type: 'repeat',
      label: 'Repeat Off',
      options: { repeat: 'OFF' },
    },
    {
      type: 'clearPlayer',
      label: 'Clear Queue',
      options: {},
    },
    {
      type: 'shuffle',
      label: 'Shuffle',
      options: { shuffle: 'TOGGLE' },
    },
  ] as const
).map((x, i) => ({ id: `${x.type}${i}`, ...x }));
