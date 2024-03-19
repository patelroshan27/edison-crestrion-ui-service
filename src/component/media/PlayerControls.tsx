import React, { useCallback, useEffect, useState } from 'react';
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
  StepBackIcon,
  StepForwardIcon,
  StopCircleIcon,
} from 'lucide-react';
import {
  type BasePlayerRequest,
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

interface PlayerControlsProps {
  playerId: string;
  playerStatus?: PlayerStatus;
  updatePlayerStatus: () => void;
}

interface PlayerTrackSliderProps {
  playerId: string;
  playerStatus?: PlayerStatus;
}

const PlayerTrackSlider: React.FC<PlayerTrackSliderProps> = ({
  playerId,
  playerStatus,
}) => {
  const [trackTime, setTrackTime] = useState(0);
  const getPlayerTime = useGetPlayerTimeApi();
  const setPlayerTime = useSetPlayerTimeApi();

  const updatePlayerTime = useCallback(() => {
    getPlayerTime()
      .then((pt) => setTrackTime(Number(pt.time)))
      .catch((err) => console.log(err));
  }, [getPlayerTime]);

  const onTimeUpdate = (time: number | number[]): void => {
    setPlayerTime({ playerId, time: time as number })
      .then(updatePlayerTime)
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    updatePlayerTime();
  }, []);

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

  const onPlayerAction = (
    handler: (data: BasePlayerRequest) => Promise<void>,
  ): void => {
    handler({ playerId })
      .then(updatePlayerStatus)
      .catch((err) => console.log(err));
  };

  return (
    <Card className="h-[110px] w-full justify-center items-center">
      <div className="inline-flex gap-4 justify-center items-center">
        <ButtonGroup variant="bordered">
          <Button
            isIconOnly
            size="lg"
            onClick={() => onPlayerAction(playPrevious)}>
            <StepBackIcon />
          </Button>
          <Button
            isIconOnly
            size="lg"
            color={playerStatus?.play === 'on' ? 'primary' : 'default'}
            onClick={() => onPlayerAction(play)}>
            <PlayIcon />
          </Button>
          <Button
            isIconOnly
            size="lg"
            color={playerStatus?.pause === 'on' ? 'primary' : 'default'}
            onClick={() => onPlayerAction(pause)}>
            <PauseIcon />
          </Button>
          <Button
            isIconOnly
            size="lg"
            color={playerStatus?.play === 'off' ? 'primary' : 'default'}
            onClick={() => onPlayerAction(stop)}>
            <StopCircleIcon />
          </Button>
          <Button isIconOnly size="lg" onClick={() => onPlayerAction(playNext)}>
            <StepForwardIcon />
          </Button>
        </ButtonGroup>
        <div className="text-center w-[200px] truncate">
          {playerStatus?.track?.albumName} <br />
          {playerStatus?.track?.trackName}
        </div>
        <ButtonGroup>
          <Button
            size="lg"
            variant="bordered"
            color={playerStatus?.shuffle === 'on' ? 'primary' : 'default'}
            onClick={() => onPlayerAction(shuffle)}>
            Shuffle
          </Button>
          <Button
            size="lg"
            variant="bordered"
            color={playerStatus?.repeat === 'on' ? 'primary' : 'default'}
            onClick={() => onPlayerAction(repeat)}>
            Repeat
          </Button>
        </ButtonGroup>
      </div>
      <PlayerTrackSlider playerId={playerId} playerStatus={playerStatus} />
    </Card>
  );
};
