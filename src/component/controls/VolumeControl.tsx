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
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import FlatButton from './FlatButton';

const MAX = 100;
const MIN = 0;
const STEP = 2;

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
  const onLevelUp = usePublishDigital(levelUp);
  const onLevelDown = usePublishDigital(levelDown);

  const [level, setLevel] = useState(getDbToPercent(feedback));

  useEffect(() => {
    setLevel(getDbToPercent(feedback));
  }, [setLevel, feedback]);

  const isPlaying = playing || !paused;

  return (
    <div
      className={classNames(
        'bg-slate-200 rounded-2xl p-6 w-full h-full flex flex-col gap-6 items-center',
        className,
      )}>
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-3">
          <div
            className={classNames(
              'flex w-14 shrink-0 grow-0 aspect-square items-center justify-center text-2xl rounded-full',
              'bg-slate-100',
            )}>
            <p className="text-xl font-semibold text-indigo-600">{level}</p>
          </div>
          <div
            className={classNames('w-full text-start flex flex-col gap-1.5')}>
            <p className="text-sm leading-none font-semibold text-slate-500">
              {title ?? 'Volume'}
            </p>
            <p className={classNames('text-lg leading-none text-slate-900')}>
              {label}
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[3.5rem,1fr] gap-4 h-full w-full">
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
                    'h-full w-4 self-center bg-slate-300 rounded-full',
                  )}>
                  {children}
                </div>
              </div>
            </div>
          )}
          renderThumb={({ props, isDragged, value }: IRenderThumbParams) => (
            <>
              <div
                ref={props.ref}
                style={{ height: `${value}%` }}
                className={classNames(
                  'absolute z-1 bottom-0 w-full self-center shadow-md rounded-full',
                  'bg-gradient-to-t shadow-md',
                  playing
                    ? 'from-indigo-300 to-indigo-700 shadow-indigo-400'
                    : 'from-red-300 to-red-700 shadow-red-400',
                )}
              />
              {/* <div
                {...props}
                className={classNames(
                  'z-5 h-12 w-12 rounded-full flex items-center justify-center',
                  'shadow-lg bg-white',
                )}
                style={props.style}>
                <FontAwesomeIcon
                  icon={icon({ name: 'grip' })}
                  className={classNames(
                    isDragged ? 'text-indigo-500' : 'text-slate-300',
                  )}
                />
              </div> */}
            </>
          )}
        />
        <div className="flex flex-col gap-4">
          <FlatButton
            label="Up"
            iconDef={icon({ name: 'volume-high' })}
            onClick={() => {
              onLevelUp();
            }}
          />
          <FlatButton
            label="Down"
            iconDef={icon({ name: 'volume-low' })}
            onClick={() => {
              onLevelDown();
            }}
          />
          <FlatButton
            className={
              isPlaying
                ? 'bg-indigo-200 border border-indigo-400 text-indigo-700'
                : 'bg-red-200 border border-red-400 text-red-700'
            }
            label={isPlaying ? pauseLabel : playLabel}
            iconDef={
              isPlaying
                ? icon({ name: 'microphone-lines' })
                : icon({ name: 'microphone-lines-slash' })
            }
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
