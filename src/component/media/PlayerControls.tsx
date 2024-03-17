import React from 'react';
import { Button, ButtonGroup, Card, Slider } from '@nextui-org/react';
import {
  PauseIcon,
  PlayIcon,
  ShuffleIcon,
  StepBackIcon,
  StepForwardIcon,
  StopCircleIcon,
} from 'lucide-react';

interface PlayerControlsProps {
  test?: string;
}

export const PlayerControls: React.FC<PlayerControlsProps> = () => {
  return (
    <Card className="h-[100px] w-full justify-center items-center">
      <ButtonGroup variant="bordered">
        <Button isIconOnly size="lg">
          <PlayIcon />
        </Button>
        <Button isIconOnly size="lg">
          <PauseIcon />
        </Button>
        <Button isIconOnly size="lg">
          <StopCircleIcon />
        </Button>
        <Button isIconOnly size="lg">
          <StepBackIcon />
        </Button>
        <Button isIconOnly size="lg">
          <StepForwardIcon />
        </Button>
        <Button isIconOnly size="lg">
          <ShuffleIcon />
        </Button>
      </ButtonGroup>
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
