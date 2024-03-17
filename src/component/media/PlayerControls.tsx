import React, { useEffect, useState } from 'react';
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
  useGetPlayerStatusApi,
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
}

export const PlayerControls: React.FC<PlayerControlsProps> = ({ playerId }) => {
  const [playerStatus, setPlayerStatus] = useState<PlayerStatus>();
  const getPlayerStatus = useGetPlayerStatusApi();
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
    handler({ playerId }).catch((err) => console.log(err));
  };

  useEffect(() => {
    getPlayerStatus({ playerId })
      .then(setPlayerStatus)
      .catch((err) => console.log(err));
  }, []);

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
          <Button isIconOnly size="lg" onClick={() => onPlayerAction(play)}>
            <PlayIcon />
          </Button>
          <Button isIconOnly size="lg" onClick={() => onPlayerAction(pause)}>
            <PauseIcon />
          </Button>
          <Button isIconOnly size="lg" onClick={() => onPlayerAction(stop)}>
            <StopCircleIcon />
          </Button>
          <Button isIconOnly size="lg" onClick={() => onPlayerAction(playNext)}>
            <StepForwardIcon />
          </Button>
        </ButtonGroup>
        <div className="text-center w-[200px] truncate">
          Album 1 <br />
          Track 1
        </div>
        <ButtonGroup>
          <Button
            size="lg"
            variant="bordered"
            onClick={() => onPlayerAction(shuffle)}>
            Shuffle
          </Button>
          <Button
            size="lg"
            variant="bordered"
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
