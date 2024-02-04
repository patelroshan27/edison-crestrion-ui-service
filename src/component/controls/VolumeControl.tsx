import type { AudioControlData } from 'utils/Configs';

import React, { useEffect, useState } from 'react';
import { ConversionValues } from 'utils/Constants';
import {
  useAnalogState,
  useDigitalState,
  usePublishAnalog,
  usePublishDigital,
} from 'utils/hooks';
import { Direction, Range } from 'react-range';
import classNames from 'classnames';
import {
  type IRenderTrackParams,
  type IRenderThumbParams,
} from 'react-range/lib/types';
import FlatButton from './FlatButton';
import { Mic, MicOff, Volume1, Volume2 } from 'lucide-react';

const MAX = 100;
const MIN = 0;
const STEP = 2;
const VOLUME_STEP = ConversionValues.MAX_DECIMAL / 100;

function getDbToPercent(db: number): number {
  return Math.round((db / ConversionValues.MAX_DECIMAL) * 100);
}

function getPercentToDB(percent: number): number {
  return Math.round((percent / 100) * ConversionValues.MAX_DECIMAL);
}

interface Props {
  className: string;
  config: AudioControlData;
}

const VolumeControl: React.FC<Props> = ({
  className,
  config: {
    label,
    lock,
    play,
    pause,
    toggle,
    levelUp,
    levelDown,
    state,
    playLabel = 'PLAY',
    pauseLabel = 'PAUSE',
    title,
  },
}: Props) => {
  const feedback = useAnalogState(state);
  const onPublish = usePublishAnalog(state);
  // const onUnlock = usePublishDigital(lock);
  const playing = useDigitalState(play);
  const paused = useDigitalState(pause);
  const onToggle = usePublishDigital(toggle);
  const onLevelUp = usePublishAnalog(levelUp);
  const onLevelDown = usePublishAnalog(levelDown);

  const [level, setLevel] = useState(getDbToPercent(feedback));

  useEffect(() => {
    setLevel(getDbToPercent(feedback));
  }, [setLevel, feedback]);

  const isPlaying = playing || !paused;

  return (
    <div
      className={classNames(
        'border border-primary rounded-2xl p-6 w-full h-full flex flex-col space-y-6 items-center',
        className,
      )}>
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center space-x-3">
          <div
            className={classNames(
              'flex w-14 h-14 shrink-0 grow-0 items-center justify-center text-2xl rounded-full',
              'bg-primary text-primary-foreground',
            )}>
            <p className="text-xl font-semibold">{level}</p>
          </div>
          <div
            className={classNames(
              'w-full text-start flex flex-col space-y-1.5',
            )}>
            <p className="text-sm leading-none font-semibold text-sexondary">
              {title ?? 'Volume'}
            </p>
            <p className={classNames('text-xl leading-none text-primary')}>
              {label}
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[3.75rem_1fr] gap-4 grow w-full">
        <Range
          direction={Direction.Up}
          step={STEP}
          min={MIN}
          max={MAX}
          values={[level]}
          onChange={(values) => {
            onPublish(getPercentToDB(values[0]));
            // setLevel(values[0]);
          }}
          renderTrack={({ props, children }: IRenderTrackParams) => (
            <div
              className={classNames(
                'grow-1 flex h-full items-center justify-center w-14',
                // 'bg-slate-100/60 rounded-xl border border-slate-300',
              )}>
              <div
                onMouseDown={(...args) => {
                  // onUnlock();
                  // props.onMouseDown(...args);
                }}
                onTouchStart={(...args) => {
                  // onUnlock();
                  // props.onTouchStart(...args);
                }}
                className="grow-1 flex h-full"
                style={{
                  ...props.style,
                }}>
                <div
                  ref={props.ref}
                  className={classNames(
                    'h-full w-4 self-center bg-white/20 rounded-full',
                  )}>
                  {children}
                </div>
              </div>
            </div>
          )}
          renderThumb={({ props, isDragged, value }: IRenderThumbParams) => (
            <div
              ref={props.ref}
              style={{ height: `${value}%` }}
              className={classNames(
                'absolute z-1 bottom-0 w-full self-center shadow-md rounded-full',
                'bg-gradient-to-t shadow-md',
                playing
                  ? 'from-amber-200 to-amber-700'
                  : 'from-red-200 to-red-700',
              )}
            />
          )}
        />
        <div className="flex flex-col space-y-4">
          <FlatButton
            label="Up"
            iconDef={Volume2}
            onClick={() => {
              onLevelUp(level + VOLUME_STEP);
            }}
          />
          <FlatButton
            label="Down"
            iconDef={Volume1}
            onClick={() => {
              onLevelDown(level - VOLUME_STEP);
            }}
          />
          <FlatButton
            className={
              // isPlaying
              //   ? 'bg-indigo-200 border border-indigo-400 text-indigo-700'
              'bg-red-700 text-red-200'
            }
            label={isPlaying ? pauseLabel : playLabel}
            iconDef={isPlaying ? Mic : MicOff}
            onClick={() => {
              onToggle();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default VolumeControl;
