import DefaultConfigs from 'utils/DefaultConfigs';
import SarvasvaConfigs from './SarvasvaConfigs';
import BoysGymConfig from './BoysGymConfig';
import { type LucideIcon } from 'lucide-react';
import GirlsGymConfig from './GirlsGymConfig';

export interface CrestronConfigs {
  host: string;
  ipID: number;
  port: number;
}

export type Page = string;
export type LightApiType = 'zum' | 'pharos';
export type AudioApiCmdType = 'CS' | 'LP' | 'GS';
export type AudioApiCmdName =
  | 'Source'
  | 'Get Vol'
  | 'Vol Change'
  | 'Vol Reset'
  | 'Vol Mute'
  | 'Vol Unmute';

export interface LightsApiPayload {
  room: string;
  scene: string;
}

export interface CrestronWebrelayPayload {
  authId: 'BoysGym' | 'GirlsGym';
  name: 'leftHoop' | 'rightHoop' | 'curtain';
  action: 'UP' | 'DOWN' | 'STOP';
}

export interface AudioApiPaylod {
  cmdType: AudioApiCmdType;
  cmdName: AudioApiCmdName;
  controlNumber: string;
  controlPosition: string;
}

export interface WebrelayApiCommand {
  type: 'webrelay';
  payload: CrestronWebrelayPayload;
}

export interface LightsApiCommand {
  type: LightApiType;
  payload: LightsApiPayload;
}

export interface AudioApiCommand {
  type: 'audio';
  payload: AudioApiPaylod;
}

export interface ColorIntensity {
  name: string;
  icon?: LucideIcon;
  color: string;
  scene: string;
}

export interface PharosControlData {
  kind: 'pharos';
  room: string;
  colorStates: ColorIntensity[];
}

export interface CrestronWebrelayConfig {
  payload: CrestronWebrelayPayload;
}

export type ApiCommand =
  | LightsApiCommand
  | WebrelayApiCommand
  | AudioApiCommand;

export interface LightControlData {
  kind: 'light' | 'toggle';
  icon: LucideIcon;
  iconOff?: LucideIcon;
  title?: string;
  label: string;
  labelOff?: string;
  webRelayConfig?: CrestronWebrelayConfig;
  color?: string;
  apiCommands?: ApiCommand[];
}

export interface AudioControlData {
  kind: 'audio';
  icon: LucideIcon;
  title?: string;
  label: string;
  playLabel?: string;
  pauseLabel?: string;
  getVolCmd: AudioApiCommand;
  volChangeCmd: AudioApiCommand;
  resetCmd?: AudioApiCommand;
  muteCmd: AudioApiCommand;
  unMuteCmd?: AudioApiCommand;
}

export interface GroupControlData {
  kind: 'group';
  className?: string;
  controls: LightControlData[];
  getActiveValue?: (
    sendCommands: (commands: ApiCommand[]) => Promise<unknown[]>,
  ) => Promise<string>;
  parseActiveValueKey?: (cmd: ApiCommand) => string;
}

export type ControlData =
  | LightControlData
  | PharosControlData
  | AudioControlData
  | GroupControlData;

export interface PageData {
  code?: string;
  name: string;
  icon: LucideIcon;
  className?: string;
  controls: { [key in string]: ControlData };
  style?: React.CSSProperties;
}

export const CONFIGS = {
  sarvasva: SarvasvaConfigs,
  boysgym: BoysGymConfig,
  girlsgym: GirlsGymConfig,
} as const;

export type RoomKey = keyof typeof CONFIGS;
export interface Room {
  key: RoomKey;
  title: string;
}

export interface UIConfig {
  rooms: Room[];
  authProviderURL?: string;
  webRelayApiPath?: string;
  pharosApiPath?: string;
  zumApiPath?: string;
  audioApiPath?: string;
  authID?: string;
  crestronConfigs: CrestronConfigs;
  id?: number | string;
  screenOff?: string;
  proximityActivity?: string;
  touchActivity?: string;
  pages: { [key in Page]: PageData };
}

export function getConfigs(
  roomKey = process.env.REACT_APP_ROOM_CONFIG_NAME as RoomKey,
): UIConfig {
  return CONFIGS[roomKey] || DefaultConfigs;
}
