import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Button,
  ButtonGroup,
  Card,
  Slider,
  type SliderValue,
} from '@nextui-org/react';
import {
  PauseIcon,
  PlayIcon,
  Repeat2Icon,
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
import { formatSecondsToMinutes } from './utils';

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
    getPlayerTime()
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
      label={trackTime > 0 ? 'Playing' : ''}
      getValue={sliderGetValue}
      color="foreground"
      value={trackTime}
      onChange={(v) => setTrackTime(v as number)}
      onChangeEnd={onTimeUpdate}
      className="max-w-md mt-3"
    />
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
    apiPromise.then(updatePlayerStatus).catch((err) => console.log(err));
  };

  return (
    <Card className="h-[110px] w-full justify-center items-center">
      <div className="inline-flex gap-4 justify-center items-center">
        <ButtonGroup variant="bordered">
          <Button
            isIconOnly
            size="lg"
            onClick={() => onPlayerAction(playPrevious({ playerId }))}>
            <StepBackIcon />
          </Button>
          <Button
            isIconOnly
            size="lg"
            color={playerStatus?.play === 'on' ? 'primary' : 'default'}
            onClick={() => onPlayerAction(play({ playerId }))}>
            <PlayIcon />
          </Button>
          <Button
            isIconOnly
            size="lg"
            color={playerStatus?.pause === 'on' ? 'primary' : 'default'}
            onClick={() => onPlayerAction(pause({ playerId }))}>
            <PauseIcon />
          </Button>
          <Button
            isIconOnly
            size="lg"
            color={playerStatus?.play === 'off' ? 'primary' : 'default'}
            onClick={() => onPlayerAction(stop({ playerId }))}>
            <StopCircleIcon />
          </Button>
          <Button
            isIconOnly
            size="lg"
            onClick={() => onPlayerAction(playNext({ playerId }))}>
            <StepForwardIcon />
          </Button>
        </ButtonGroup>
        <div className="text-center w-[300px] truncate">
          {playerStatus?.track?.albumName} <br />
          {playerStatus?.track?.trackName}
        </div>
        <ButtonGroup>
          <Button
            size="lg"
            variant="bordered"
            isIconOnly
            color={playerStatus?.shuffle === 'on' ? 'primary' : 'default'}
            onClick={() => onPlayerAction(shuffle({ playerId }))}>
            <ShuffleIcon />
          </Button>
          <Button
            size="lg"
            variant="bordered"
            isIconOnly
            color={playerStatus?.repeat === 'on' ? 'primary' : 'default'}
            onClick={() =>
              onPlayerAction(
                repeat({
                  playerId,
                  repeat: playerStatus?.repeat === 'on' ? 'OFF' : 'ALL',
                }),
              )
            }>
            <Repeat2Icon />
          </Button>
        </ButtonGroup>
      </div>
      <PlayerTrackSlider
        playerId={playerId}
        playerStatus={playerStatus}
        updatePlayerStatus={updatePlayerStatus}
      />
    </Card>
  );
};
