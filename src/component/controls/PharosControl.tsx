import type {
  ColorIntensity,
  LightsApiPayload,
  PharosControlData,
} from 'config/Configs';

import React, { useState } from 'react';
import classNames from 'classnames';
import { usePharosApiState } from 'utils/hooks';

const MAX_ROWS = 4;

interface PharosColorControlProps extends ColorIntensity {
  room: string;
  activeScene?: string;
  extraPayloads?: LightsApiPayload[];
  onPharosCmd: (scene: string) => void;
}

const PharosColorControl: React.FC<PharosColorControlProps> = ({
  icon: Icon,
  color,
  room,
  scene,
  activeScene,
  extraPayloads,
  onPharosCmd,
}) => {
  const sendPharosCmd = usePharosApiState();

  const iconDisplay =
    Icon != null ? (
      <Icon className={classNames('h-7 w-7 text-primary')} />
    ) : null;

  return (
    <button
      className={classNames(
        'outline-none focus:outline-none border-4 flex items-center justify-center',
        'transition h-full rounded-[50%] border-neutral-400 overflow-hidden w-full max-w-[7rem] max-h-[7rem]',
        activeScene === scene
          ? 'border border-active rounded-2xl scale-100'
          : 'scale-80',
        color,
      )}
      type="button"
      onClick={() => {
        sendPharosCmd([{ room, scene }].concat(extraPayloads ?? []))
          .then(() => onPharosCmd(scene))
          .catch((err) => console.log(err));
      }}>
      {iconDisplay}
    </button>
  );
};

interface Props {
  className?: string;
  config: PharosControlData;
}

const CustomControl: React.FC<Props> = ({ className, config }: Props) => {
  const [activeScene, setActiveScene] = useState<string>();
  const rowModulous = Math.min(
    Math.ceil(config.colorStates.length / MAX_ROWS),
    4,
  );

  const rows: ColorIntensity[][] = config.colorStates.reduce<
    ColorIntensity[][]
  >((acc, item, index) => {
    const rowIndex = index % rowModulous;
    if (acc[rowIndex] == null) {
      acc[rowIndex] = [];
    }
    acc[rowIndex].push(item);
    return acc;
  }, []);

  const colorPalettes = rows.map((row, index) => {
    return row.map((item) => {
      return (
        <PharosColorControl
          {...item}
          room={config.room}
          key={`${config.room}${item.scene}`}
          activeScene={activeScene}
          extraPayloads={item.extraPayloads}
          onPharosCmd={setActiveScene}
        />
      );
    });
  });

  return (
    <div
      className={classNames(
        'flex w-full h-full items-center justify-center',
        className,
      )}>
      <div className="grid w-full">
        {colorPalettes.map((row, index) => {
          return (
            <div
              key={`row-${index}`}
              className={classNames(
                'h-[9rem] flex items-center justify-center',
                className,
              )}>
              {row}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomControl;
