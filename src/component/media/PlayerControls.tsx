import React from 'react';
import { Button, ButtonGroup, Card, Slider } from '@nextui-org/react';
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
} from './hooks';
import { type PlayerStatus } from './types';

interface PlayerControlsProps {
  playerId: string;
  playerStatus?: PlayerStatus;
  updatePlayerStatus: () => void;
}

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
    <Card className="h-[100px] w-full justify-center items-center">
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
      <Slider
        size="sm"
        step={0.01}
        maxValue={1}
        minValue={0}
        color="foreground"
        showOutline={true}
        aria-label="Temperature"
        defaultValue={0.2}
        className="max-w-md mt-3"
      />
    </Card>
  );
};
