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

export interface JobActionItem {
  id: string;
  authID: string;
  target: string;
  label: string;
  commands: ApiCommand[];
}

const getActions = (): JobActionItem[] => {
  const controls = Object.values(CONFIGS)
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

  const lightAndToggleCommands = controls.flatMap((control) => {
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

  const pharosCommands = controls.flatMap((control) => {
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

  return [...lightAndToggleCommands, ...pharosCommands].map((x, i) => ({
    ...x,
    id: `${x.authID ?? 'NoAuthID'}:${x.target ?? 'NoTarget'}:${x.label}:${i}`,
  })) as JobActionItem[];
};

export const JOB_ACTIONS = getActions();
export const JOB_ACTIONS_MAP = new Map(JOB_ACTIONS.map((x) => [x.id, x]));
