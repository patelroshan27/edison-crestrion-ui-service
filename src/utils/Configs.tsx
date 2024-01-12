import { useMemo } from 'react';
import DefaultConfigs from 'utils/DefaultConfigs';
import { type IconDefinition } from '@fortawesome/fontawesome-svg-core';
import SarvasvaConfigs from './SarvasvaConfigs';

export interface CrestronConfigs {
  host: string;
  ipID: number;
  port: number;
}

export type Page = string;

export interface Intensity {
  state: string;
  stateOff: string;
  name: string;
}

export interface LightControlData {
  kind: 'light' | 'toggle';
  icon: IconDefinition;
  title?: string;
  label: string;
  state: string;
  stateOff?: string;
  intensityStates?: Intensity[];
  analogFeedback?: string;
  color?: string;
  inverted?: boolean;
  hasFeedback?: boolean;
}

export interface AudioControlData {
  kind: 'audio';
  icon: IconDefinition;
  title?: string;
  label: string;
  lock: string;
  play: string;
  pause: string;
  toggle: string;
  levelUp: string;
  levelDown: string;
  playLabel?: string;
  pauseLabel?: string;
  state: string;
}

export interface TemperatureControlData {
  kind: 'temperature';
}

export interface CustomControlData {
  kind: 'custom';
  icon: IconDefinition;
  label: string;
  title?: string;
  isActive: () => Promise<boolean>;
  onToggleOn: () => Promise<void>;
  onToggleOff: () => Promise<void>;
}

export type ControlData =
  | LightControlData
  | AudioControlData
  | TemperatureControlData
  | CustomControlData;

export interface PageData {
  code?: string;
  name: string;
  icon: IconDefinition;
  className?: string;
  controls: { [key in string]: ControlData };
  style?: React.CSSProperties;
}

export interface LayoutConfigs {
  bodyColor?: string;
  foregroundColor?: string;
  navColor?: string;
}

export interface UIConfig {
  crestronConfigs: CrestronConfigs;
  id?: number | string;
  screenOff?: string;
  proximityActivity?: string;
  touchActivity?: string;
  layout: LayoutConfigs;
  pages: { [key in Page]: PageData };
}

export function getConfigs(): UIConfig {
  switch (process.env.REACT_APP_ROOM_CONFIG_NAME) {
    case 'sarvasva':
      return SarvasvaConfigs;
    // ADD CASES BELOW TO HANDLE OTHER CONFIGS
  }
  return DefaultConfigs;
}

export function useConfigs(): UIConfig {
  return useMemo(() => getConfigs(), []);
}
