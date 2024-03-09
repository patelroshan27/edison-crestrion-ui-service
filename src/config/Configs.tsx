import DefaultConfigs from 'config/DefaultConfigs';
import Sarvasva from './first-floor/santnivas/Sarvasva';
import BoysGym from './second-floor/BoysGym';
import { type LucideIcon } from 'lucide-react';
import GirlsGym from './second-floor/GirlsGym';
import Branhamanad from './first-floor/santnivas/Branhamanad';
import SantOffice1 from './first-floor/santnivas/SantOffice1';
import SantOffice2 from './first-floor/santnivas/SantOffice2';
import SantCorridor from './first-floor/santnivas/SantCorridor';
import SantKitchen from './first-floor/santnivas/SantKitchen';
import SantNivas from './first-floor/santnivas/SantNivas';

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
  payloads: LightsApiPayload[];
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
  extraPayloads?: LightsApiPayload[];
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
  santnivas: SantNivas,
  sarvasva: Sarvasva,
  boysgym: BoysGym,
  girlsgym: GirlsGym,
  branhamanad: Branhamanad,
  santoffice1: SantOffice1,
  santoffice2: SantOffice2,
  santcorridor: SantCorridor,
  santkitchen: SantKitchen,
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
