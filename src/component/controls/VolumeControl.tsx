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
  containerWidth?: number;
}

const VolumeControl: React.FC<Props> = ({
  className,
  containerWidth,
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
  const [isMediumScreen, setIsMediumScreen] = useState(false);

  useEffect(() => {
    const isMediaMedium = containerWidth
      ? containerWidth >= 410 && containerWidth <= 1030
      : false;
    setIsMediumScreen(isMediaMedium);
  }, [containerWidth]);

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
        'border-2 border-purple-500',
        'bg-secondary',
        'flex flex-col',
        isMediumScreen ? 'p-3' : 'sm:p-2 lg:p-4',
        isMediumScreen ? 'gap-3' : 'sm:gap-2 lg:gap-4',
        className,
      )}>
      {/* Volume Level Display - More compact */}
      <div
        className={classNames(
          'flex items-center',
          'border-2 border-orange-500',
          'p-2',
          'bg-secondary rounded-lg',
        )}>
        <div
          className={classNames(
            'flex items-center justify-center',
            'rounded-lg',
            'border-2 border-yellow-500',
            isMediumScreen
              ? 'w-12 h-12'
              : 'sm:w-10 sm:h-10 lg:w-14 lg:h-14',
            '!bg-active text-primary-foreground',
          )}>
          <p className="sm:text-xl md:text-2xl lg:text-3xl font-semibold">
            {level}
          </p>
        </div>
        <div className="flex flex-col ml-3">
          <p className="sm:text-base md:text-lg lg:text-xl font-semibold text-primary">
            {title ?? 'Volume'}
          </p>
          <p className="sm:text-lg md:text-xl lg:text-2xl text-primary">
            {label}
          </p>
        </div>
      </div>

      {/* Controls Section - Adjusted grid */}
      <div
        className={classNames(
          'grid',
          'border-2 border-blue-500',
          isMediumScreen
            ? 'grid-cols-[3rem_1fr]'
            : 'sm:grid-cols-[2.5rem_1fr] lg:grid-cols-[3.5rem_1fr]',
          isMediumScreen ? 'gap-3' : 'sm:gap-2 lg:gap-4',
          'grow',
        )}>
        {/* Slider - Thinner and centered */}
        <div className="flex items-center justify-center border-2 border-pink-500">
          <Range
            direction={Direction.Up}
            step={STEP}
            min={MIN}
            max={MAX}
            values={[level]}
            onChange={(values) => handleVolChange(values[0])}
            renderTrack={({ props, children }: IRenderTrackParams) => (
              <div className="flex h-full items-center justify-center w-full">
                <div {...props} className="flex h-full">
                  <div
                    ref={props.ref}
                    className={classNames(
                      'h-full self-center rounded-full',
                      'border border-neutral-400 bg-neutral-200',
                      'w-2',
                    )}>
                    {children}
                  </div>
                </div>
              </div>
            )}
            renderThumb={({ props, value }: IRenderThumbParams) => (
              <div
                ref={props.ref}
                style={{ height: `${value}%` }}
                className={classNames(
                  'absolute z-1 bottom-0 w-full self-center shadow-md rounded-full',
                  'bg-gradient-to-t',
                  muted
                    ? 'from-secondary to-active'
                    : 'from-secondary to-active',
                )}
              />
            )}
          />
        </div>

        {/* Control Buttons - Larger and matching ButtonGroup style */}
        <div
          className={classNames(
            'flex flex-col',
            'border-2 border-red-500',
            'sm:gap-2 md:gap-3 lg:gap-4',
          )}>
          <FlatButton
            label="Up"
            iconDef={Volume2}
            onClick={() => handleVolChange(level + STEP)}
            className={classNames(
              'border border-neutral-400',
              'bg-secondary text-primary',
              'h-14 sm:h-16 md:h-18 lg:h-20',
            )}
          />
          <FlatButton
            label="Down"
            iconDef={Volume1}
            onClick={() => handleVolChange(level - STEP)}
            className={classNames(
              'border border-neutral-400',
              'bg-secondary text-primary',
              'h-14 sm:h-16 md:h-18 lg:h-20',
            )}
          />
          {muteCmd && unMuteCmd && (
            <FlatButton
              className={classNames(
                'border border-neutral-400',
                !muted
                  ? '!bg-active text-primary-foreground'
                  : 'bg-secondary text-primary',
                'h-14 sm:h-16 md:h-18 lg:h-20',
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
              className={classNames(
                'border border-neutral-400',
                'bg-secondary text-primary',
                'h-14 sm:h-16 md:h-18 lg:h-20',
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default VolumeControl;
