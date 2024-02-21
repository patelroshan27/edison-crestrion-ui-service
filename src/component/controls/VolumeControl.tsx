import type { AudioControlData } from 'utils/Configs';

import React, { useEffect, useState } from 'react';
import { ConversionValues } from 'utils/Constants';
import { Direction, Range } from 'react-range';
import classNames from 'classnames';
import {
  type IRenderTrackParams,
  type IRenderThumbParams,
} from 'react-range/lib/types';
import FlatButton from './FlatButton';
import { Mic, MicOff, Volume1, Volume2, TimerReset } from 'lucide-react';
import { useApiCommands } from 'utils/hooks';

const MAX = 100;
const MIN = 0;
const STEP = 1;
const MAX_DB_DECIMAL = 50000;

function getPercentToDB(percent: number): number {
  return Math.round((percent / 100) * MAX_DB_DECIMAL);
}

function getDBToPercentage(db: number): number {
  return Math.round((db * 100) / MAX_DB_DECIMAL);
}

interface Props {
  className: string;
  config: AudioControlData;
}

const VolumeControl: React.FC<Props> = ({
  className,
  config: {
    label,
    playLabel = 'PLAY',
    pauseLabel = 'PAUSE',
    title,
    getVolCmd,
    volChangeCmd,
    muteCmd,
    unMuteCmd,
    resetCmd,
  },
}: Props) => {
  const sendCommands = useApiCommands();

  const [level, setLevel] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    sendCommands([getVolCmd])
      .then((data) => {
        setLevel(getDBToPercentage(Number(data)));
      })
      .catch((err) => console.log(err));

    sendCommands([muteCmd])
      .then(() => setPlaying(false))
      .catch((err) => console.log(err));
  }, []);

  const handleVolChange = (newLevel: number): void => {
    if (newLevel < MIN || newLevel > MAX) return;

    sendCommands([
      {
        type: volChangeCmd.type,
        payload: {
          ...volChangeCmd.payload,
          controlPosition: getPercentToDB(newLevel).toString(),
        },
      },
    ])
      .then(() => setLevel(newLevel))
      .catch((err) => console.log(err));
  };

  const handleVolReset = (): void => {
    sendCommands([resetCmd!])
      .then(() => {
        setTimeout(() => {
          sendCommands([getVolCmd])
            .then((data) => {
              const resetLevel = getDBToPercentage(Number(data));
              setLevel(resetLevel);
            })
            .catch((err) => console.log(err));
        }, 250);
      })
      .catch((err) => console.log(err));
  };

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
            <p className="text-sm leading-none font-semibold text-primary">
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
          onChange={(values) => handleVolChange(values[0])}
          renderTrack={({ props, children }: IRenderTrackParams) => (
            <div
              className={classNames(
                'grow-1 flex h-full items-center justify-center w-14',
              )}>
              <div
                {...props}
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
            onClick={() => handleVolChange(level + STEP)}
          />
          <FlatButton
            label="Down"
            iconDef={Volume1}
            onClick={() => handleVolChange(level - STEP)}
          />
          {muteCmd && unMuteCmd && (
            <FlatButton
              className="bg-red-700 text-red-200"
              label={playing ? pauseLabel : playLabel}
              iconDef={playing ? Mic : MicOff}
              onClick={() => {
                sendCommands([playing ? muteCmd : unMuteCmd])
                  .then(() => setPlaying(!playing))
                  .catch((err) => console.log(err));
              }}
            />
          )}
          {resetCmd && (
            <FlatButton
              label="Reset"
              iconDef={TimerReset}
              onClick={() => handleVolReset()}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default VolumeControl;
