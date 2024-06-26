import type { AudioControlData } from 'config/Configs';

import React, { useEffect, useState } from 'react';
import { Direction, Range } from 'react-range';
import classNames from 'classnames';
import {
  type IRenderTrackParams,
  type IRenderThumbParams,
} from 'react-range/lib/types';
import FlatButton from './FlatButton';
import { Mic, MicOff, Volume1, Volume2, TimerReset } from 'lucide-react';
import { useApiCommands } from 'utils/hooks';
import { AUDIO_RESET_EVENT } from 'utils/events';

const MAX = 100;
const MIN = 0;
const STEP = 1;
const MAX_DB_DECIMAL = 56175; // 0 db volume

function getPercentToDB(percent: number, maxDB = MAX_DB_DECIMAL): number {
  return Math.round((percent / 100) * maxDB);
}

function getDBToPercentage(db: number, maxDB = MAX_DB_DECIMAL): number {
  return Math.round((db * 100) / maxDB);
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
    getMuteStatusCmd,
    muteCmd,
    unMuteCmd,
    resetCmd,
    maxDB,
  },
}: Props) => {
  const sendCommands = useApiCommands();

  const [level, setLevel] = useState(0);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const onResetEvent = (): void => {
      setTimeout(() => {
        sendCommands([getVolCmd])
          .then((data) => {
            const resetLevel = getDBToPercentage(Number(data), maxDB);
            setLevel(resetLevel);
          })
          .catch((err) => console.log(err));
      }, 250);
    };

    document.addEventListener(AUDIO_RESET_EVENT, onResetEvent);

    return () => {
      document.removeEventListener(AUDIO_RESET_EVENT, onResetEvent);
    };
  }, []);

  useEffect(() => {
    sendCommands([getVolCmd])
      .then((data) => {
        setLevel(getDBToPercentage(Number(data), maxDB));
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (!getMuteStatusCmd) return;
    sendCommands([getMuteStatusCmd])
      .then((data) => {
        setMuted(Number(data) === 0);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleVolChange = (newLevel: number): void => {
    if (newLevel < MIN || newLevel > MAX) return;

    sendCommands([
      {
        type: volChangeCmd.type,
        payload: {
          ...volChangeCmd.payload,
          controlPosition: getPercentToDB(newLevel, maxDB).toString(),
        },
      },
    ])
      .then(() => setLevel(newLevel))
      .catch((err) => console.log(err));
  };

  const handleVolReset = (): void => {
    resetCmd &&
      sendCommands([resetCmd])
        .then(() => {
          document.dispatchEvent(new CustomEvent(AUDIO_RESET_EVENT));
        })
        .catch((err) => console.log(err));
  };

  return (
    <div
      className={classNames(
        'border border-neutral-400 rounded-2xl p-6 w-full h-full flex flex-col space-y-6 items-center',
        className,
      )}>
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center space-x-3">
          <div
            className={classNames(
              'flex w-14 h-14 shrink-0 grow-0 items-center justify-center text-2xl rounded-full',
              '!bg-active text-primary-foreground',
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
                    'h-full w-4 self-center border border-neutral-700 bg-neutral-400 rounded-full',
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
                muted
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
              className={classNames(
                !muted
                  ? 'bg-red-700 text-red-200'
                  : 'border border-neutral-400 bg-secondary text-active',
              )}
              label={muted ? pauseLabel : playLabel}
              iconDef={muted ? Mic : MicOff}
              onClick={() => {
                sendCommands([muted ? muteCmd : unMuteCmd])
                  .then(() => setMuted(!muted))
                  .catch((err) => console.log(err));
              }}
            />
          )}
          {resetCmd && (
            <FlatButton
              label="Reset"
              iconDef={TimerReset}
              onClick={handleVolReset}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default VolumeControl;
