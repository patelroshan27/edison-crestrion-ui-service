import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Card, Slider, type SliderValue } from '@nextui-org/react';
import {
  PauseIcon,
  PlayIcon,
  Repeat2Icon,
  type Shuffle,
  ShuffleIcon,
  StepBackIcon,
  StepForwardIcon,
  StopCircleIcon,
} from 'lucide-react';
import {
  usePlayerNextApi,
  usePlayerPauseApi,
  usePlayerPlayApi,
  usePlayerPrevApi,
  usePlayerRepeatApi,
  usePlayerShuffleApi,
  usePlayerStopApi,
  useGetPlayerTimeApi,
  useSetPlayerTimeApi,
} from './hooks';
import { type PlayerStatus } from './types';
import { formatSecondsToMinutes, onMediaPlayerAction } from './utils';
import classNames from 'classnames';

const STOPPED_UPDATE_INTERVAL = 1000 * 10;
const PLAYING_UPDATE_INTERVAL = 1000;

interface PlayerControlsProps {
  playerId: string;
  playerStatus?: PlayerStatus;
  updatePlayerStatus: () => void;
}

type PlayerTrackSliderProps = PlayerControlsProps;

const PlayerTrackSlider: React.FC<PlayerTrackSliderProps> = ({
  playerId,
  playerStatus,
  updatePlayerStatus,
}) => {
  const [trackTime, setTrackTime] = useState(0);
  const trackTimeRef = useRef<number>(0);
  const getPlayerTime = useGetPlayerTimeApi();
  const setPlayerTime = useSetPlayerTimeApi();

  const updatePlayerTime = useCallback(() => {
    getPlayerTime({ playerId })
      .then((pt) => {
        const newTime = Number(pt.time);
        // handle possible track change
        if (newTime < trackTimeRef.current) {
          updatePlayerStatus();
        }
        trackTimeRef.current = newTime;
        setTrackTime(newTime);
      })
      .catch((err) => console.log(err));
  }, [getPlayerTime]);

  const onTimeUpdate = (time: number | number[]): void => {
    setPlayerTime({ playerId, time: time as number })
      .then(updatePlayerTime)
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const timeUpdateInterval =
      playerStatus?.play === 'on'
        ? PLAYING_UPDATE_INTERVAL
        : STOPPED_UPDATE_INTERVAL;
    const interval = setInterval(updatePlayerTime, timeUpdateInterval);

    return () => {
      clearInterval(interval);
    };
  }, [playerStatus?.play]);

  const trackDuration = playerStatus?.track?.trackDuration;
  const sliderGetValue = (time: SliderValue): string =>
    trackDuration
      ? `${formatSecondsToMinutes(time as number)} of ${formatSecondsToMinutes(
        trackDuration,
      )}`
      : '';

  return (
    <Slider
      size="sm"
      aria-label="player track time"
      maxValue={playerStatus?.track?.trackDuration ?? 100}
      minValue={0}
        showOutline={true}
      label={playerStatus?.track?.trackName}
      getValue={sliderGetValue}
      color="secondary"
      value={trackTime}
      onChange={(v) => setTrackTime(v as number)}
      onChangeEnd={onTimeUpdate}
      className="max-w-md mt-3 min-h-[50px] justify-end max-w-lg"
      classNames={{
        label: 'truncate',
        value: 'min-w-[50px] text-nowrap',
      }}
    />
  );
};

interface ActionButtonProps {
  active?: boolean;
  onClick: () => void;
  Icon: typeof Shuffle;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  active,
  onClick,
  Icon,
}) => {
  return (
    <Button
      isIconOnly
      size="lg"
      variant="shadow"
      className={classNames(
        'w-16 h-16 ml-6 rounded-2xl border border-neutral-400 first:ml-0',
        active
          ? 'bg-primary text-primary-foreground'
          : 'bg-default text-primary',
      )}
      onClick={onClick}>
      <Icon size={36} />
    </Button>
  );
};

export const PlayerControls: React.FC<PlayerControlsProps> = ({
  playerId,
  playerStatus,
  updatePlayerStatus,
}) => {
  const playPrevious = usePlayerPrevApi();
  const playNext = usePlayerNextApi();
  const play = usePlayerPlayApi();
  const pause = usePlayerPauseApi();
  const stop = usePlayerStopApi();
  const shuffle = usePlayerShuffleApi();
  const repeat = usePlayerRepeatApi();

  const onPlayerAction = (apiPromise: Promise<void>): void => {
    onMediaPlayerAction(apiPromise, updatePlayerStatus);
  };

  return (
    <Card className="h-[130px] w-full bg-backround justify-center items-center mb-2">
      <div className="inline-flex justify-center items-center">
        <ActionButton
          onClick={() => onPlayerAction(playPrevious({ playerId }))}
          Icon={StepBackIcon}
        />
        <ActionButton
          active={playerStatus?.play === 'on'}
          onClick={() => onPlayerAction(play({ playerId }))}
          Icon={PlayIcon}
        />
        <ActionButton
          active={playerStatus?.pause === 'on'}
          onClick={() => onPlayerAction(pause({ playerId }))}
          Icon={PauseIcon}
        />
        <ActionButton
          active={playerStatus?.play === 'off' && playerStatus?.pause === 'off'}
          onClick={() => onPlayerAction(stop({ playerId }))}
          Icon={StopCircleIcon}
        />
        <ActionButton
          onClick={() => onPlayerAction(playNext({ playerId }))}
          Icon={StepForwardIcon}
        />
        <ActionButton
          active={playerStatus?.shuffle === 'on'}
          onClick={() => onPlayerAction(shuffle({ playerId }))}
          Icon={ShuffleIcon}
        />
        <ActionButton
          active={playerStatus?.repeat === 'on'}
          Icon={Repeat2Icon}
          onClick={() =>
            onPlayerAction(
              repeat({
                playerId,
                repeat: playerStatus?.repeat === 'on' ? 'OFF' : 'ALL',
              }),
            )
          }
        />
      </div>
      <PlayerTrackSlider
        playerId={playerId}
        playerStatus={playerStatus}
        updatePlayerStatus={updatePlayerStatus}
      />
    </Card>
  );
};
