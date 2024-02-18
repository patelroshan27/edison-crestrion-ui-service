import { useMemo } from 'react';
import DefaultConfigs from 'utils/DefaultConfigs';
import SarvasvaConfigs from './SarvasvaConfigs';
import MenGymConfig from './MenGymConfig';
import { type LucideIcon } from 'lucide-react';
import WomenGymConfig from './WomenGymConfig';

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
  | 'Vol Change'
  | 'Vol Reset'
  | 'Vol Mute'
  | 'Vol Unmute';

export interface LightsApiPayload {
  room: string;
  scene: string;
}

export interface CrestronWebrelayPayload {
  authId: 'MenGym' | 'WomenGym';
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

export interface Intensity {
  icon?: LucideIcon;
  state: string;
  stateOff: string;
  name: string;
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
  volChangeCmd: AudioApiCommand;
  resetCmd?: AudioApiCommand;
  muteCmd?: AudioApiCommand;
  unMuteCmd?: AudioApiCommand;
}

export interface TemperatureControlData {
  kind: 'temperature';
}

export interface CustomControlData {
  kind: 'custom';
  icon: LucideIcon;
  label: string;
  title?: string;
  isActive: () => Promise<boolean>;
  onToggleOn: () => Promise<void>;
  onToggleOff: () => Promise<void>;
}

export interface GroupControlData {
  kind: 'group';
  className?: string;
  controls: LightControlData[];
}

export type ControlData =
  | LightControlData
  | PharosControlData
  | AudioControlData
  | TemperatureControlData
  | GroupControlData
  | CustomControlData;

export interface PageData {
  code?: string;
  name: string;
  icon: LucideIcon;
  className?: string;
  controls: { [key in string]: ControlData };
  style?: React.CSSProperties;
}

export interface UIConfig {
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

export function getConfigs(): UIConfig {
  switch (process.env.REACT_APP_ROOM_CONFIG_NAME) {
    case 'sarvasva':
      return SarvasvaConfigs;
    case 'mengym':
      return MenGymConfig;
    case 'womengym':
      return WomenGymConfig;
      // ADD CASES BELOW TO HANDLE OTHER CONFIGS
  }
  return DefaultConfigs;
}

export function useConfigs(): UIConfig {
  return useMemo(() => getConfigs(), []);
}
