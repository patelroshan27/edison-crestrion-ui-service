import DefaultConfigs from 'config/DefaultConfigs';
import Sarvasva from './first-floor/santnivas/Sarvasva';
import BoysGym from './second-floor/BoysGym';
import GirlsGym from './second-floor/GirlsGym';
import SantOffice1 from './first-floor/santnivas/SantOffice1';
import SantOffice2 from './first-floor/santnivas/SantOffice2';
import SantCorridor from './first-floor/santnivas/SantCorridor';
import SantKitchen from './first-floor/santnivas/SantKitchen';
import Bramhanand from './first-floor/santnivas/Bramhanand';
import Aksharpith from './first-floor/aksharpith/Aksharpith';
import ShayonaFresh from './first-floor/aksharpith/ShayonaFresh';
import FFCorridor from './first-floor/aksharpith/FFCorridor';
import SabhaHall from './second-floor/SabhaHall';
import SecondFloorLobby from './second-floor/SecondFloorLobby';
import { type SvgIcon } from 'types/appState';
import Mahima from './first-floor/boys/Mahima';
import Niyam from './first-floor/boys/Niyam';
import Aatma from './first-floor/boys/Aatma';
import Gnan from './first-floor/boys/Gnan';
import Nishchay from './first-floor/boys/Nishchay';
import Master from './first-floor/santnivas/Master';
import BanquetLarge from './basement/BanquetLarge';
import Pramukh from './first-floor/boys/Pramukh';
import Yogi from './first-floor/boys/Yogi';
import Yagnapurush from './first-floor/girls/Yagnapurush';
import Ashro from './first-floor/girls/Ashro';
import Prapti from './first-floor/girls/Prapti';
import Ruchi from './first-floor/girls/Ruchi';
import Samarpan from './first-floor/girls/Samarpan';
import Upasana from './first-floor/girls/Upasana';
import Exterior from './exterior/Exterior';
import Sarvakarta from './first-floor/boys/Sarvakarta';
import SampSquare from './first-floor/boys/SampSquare';
import Divyabhav from './first-floor/boys/Divyabhav';

import { type MediaPlayerCmd } from 'component/media/hooks';

export interface CrestronConfigs {
  host: string;
  ipID: number;
  port: number;
}

export type Page = string;
export type LightApiType = 'zum' | 'pharos';
export type AudioApiCmdType = 'CS' | 'LP' | 'GS';
export type AudioDspIdType = 'mandir' | 'bk' | 'iBk' | 'basement';
export type AudioApiCmdName =
  | 'Source'
  | 'Get Vol'
  | 'Vol Change'
  | 'Vol Reset'
  | 'Mute Status'
  | 'Vol Mute'
  | 'Vol Unmute';

export interface LightsApiPayload {
  room: string;
  scene: string;
}

export interface ProjectorsApiPayload {
  authId: 'BanquetLarge' | 'Pramukh' | 'Yogi' | 'Yagnapurush';
  action: 'ON' | 'OFF' | 'STATUS' | 'SOURCE';
  videoSource?: string;
}

export interface CrestronWebrelayPayload {
  authId: 'BoysGym' | 'GirlsGym' | 'ExteriorWoodbridge' | 'ExteriorTurnpike';
  name:
    | 'leftHoop'
    | 'rightHoop'
    | 'curtain'
    | 'woodbridgeSideLights'
    | 'turnpikeSideLights';
  action: 'UP' | 'DOWN' | 'STOP' | 'TOGGLE' | 'STATUS';
}

export interface WebrelayExteriorStatusRes {
  datavalues: {
    relaystate: string[];
  };
}

export interface AudioApiPaylod {
  dspId: AudioDspIdType;
  cmdType: AudioApiCmdType;
  cmdName: AudioApiCmdName;
  controlNumber: string;
  controlPosition: string;
}

export interface WebrelayApiCommand {
  type: 'webrelay';
  payload: CrestronWebrelayPayload;
}

export interface MediaApiCommand {
  type: 'media';
  payload: MediaPlayerCmd;
}

export interface LightsApiCommand {
  type: LightApiType;
  payloads: LightsApiPayload[];
}

export interface ProjectorsApiCommand {
  type: 'projector';
  payloads: ProjectorsApiPayload[];
}

export interface AudioApiCommand {
  type: 'audio';
  payload: AudioApiPaylod;
}

export interface SignalApiPayload {
  signalName: string;
}

export interface SignalApiCommand {
  type: 'signal';
  payload: SignalApiPayload;
}

export interface ColorIntensity {
  name: string;
  icon?: SvgIcon;
  color: string;
  scene: string;
  extraPayloads?: LightsApiPayload[];
}

export interface PharosControlData {
  kind: 'pharos';
  room: string;
  className?: string;
  colorStates: ColorIntensity[];
}

export interface CrestronWebrelayConfig {
  payload: CrestronWebrelayPayload;
}

export type ApiCommand =
  | LightsApiCommand
  | WebrelayApiCommand
  | AudioApiCommand
  | SignalApiCommand
  | MediaApiCommand
  | ProjectorsApiCommand;

export interface LightControlData {
  kind: 'light' | 'toggle';
  icon: SvgIcon;
  iconOff?: SvgIcon;
  title?: string;
  label: string;
  labelOff?: string;
  webRelayConfig?: CrestronWebrelayConfig;
  color?: string;
  apiCommands?: ApiCommand[];
}

export interface ApiToggleButtonData {
  kind: 'apiToggle';
  icon: SvgIcon;
  iconOff?: SvgIcon;
  title?: string;
  label: string;
  labelOff?: string;
  onApiCommands: ApiCommand[];
  offApiCommands?: ApiCommand[];
  getActiveState: (
    sendCommands: (commands: ApiCommand[]) => Promise<unknown[]>,
  ) => Promise<boolean>;
}

export interface AudioControlData {
  kind: 'audio';
  icon: SvgIcon;
  title?: string;
  label: string;
  playLabel?: string;
  pauseLabel?: string;
  getVolCmd: AudioApiCommand;
  volChangeCmd: AudioApiCommand;
  resetCmd?: AudioApiCommand;
  getMuteStatusCmd?: AudioApiCommand;
  muteCmd?: AudioApiCommand;
  unMuteCmd?: AudioApiCommand;
  maxDB?: number;
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

export interface MediaPlayerControlData {
  kind: 'mediaPlayer';
  playerId: string;
}

export interface SchedulerData {
  kind: 'scheduler';
}

export type ControlData =
  | LightControlData
  | PharosControlData
  | AudioControlData
  | MediaPlayerControlData
  | SchedulerData
  | ApiToggleButtonData
  | GroupControlData;

export interface PageData {
  code?: string;
  name: string;
  icon: SvgIcon;
  className?: string;
  requiredRoles?: string[];
  controls: { [key in string]: ControlData };
  style?: React.CSSProperties;
}

export const CONFIGS = {
  master: Master,
  sarvasva: Sarvasva,
  boysgym: BoysGym,
  girlsgym: GirlsGym,
  bramhanand: Bramhanand,
  santoffice1: SantOffice1,
  santoffice2: SantOffice2,
  santcorridor: SantCorridor,
  santkitchen: SantKitchen,
  aksharpith: Aksharpith,
  ffcorridor: FFCorridor,
  shayonafresh: ShayonaFresh,
  sabhahall: SabhaHall,
  lobby260: SecondFloorLobby,
  mahima: Mahima,
  niyam: Niyam,
  nishchay: Nishchay,
  aatma: Aatma,
  gnan: Gnan,
  banquetlarge: BanquetLarge,
  pramukh: Pramukh,
  yogi: Yogi,
  ashro: Ashro,
  prapti: Prapti,
  ruchi: Ruchi,
  samarpan: Samarpan,
  upasana: Upasana,
  yagnapurush: Yagnapurush,
  exterior: Exterior,
  sarvakarta: Sarvakarta,
  sampsquare: SampSquare,
  divyabhav: Divyabhav,
} as const;

export type RoomKey = keyof typeof CONFIGS;
export interface Room {
  key: RoomKey;
  title: string;
  group?: string;
}

export interface UIConfig {
  rooms: Room[];
  lockTimeout?: number;
  authProviderURL?: string;
  webRelayApiPath?: string;
  pharosApiPath?: string;
  zumApiPath?: string;
  audioApiPath?: string;
  mediaApiPath?: string;
  projectorApiPath?: string;
  authID?: string;
  crestronConfigs?: CrestronConfigs;
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
