import type { ColorIntensity, PharosControlData } from 'config/Configs';

import React, { useState } from 'react';
import classNames from 'classnames';
import { usePharosApiState } from 'utils/hooks';

const MAX_ROWS = 4;

interface PharosColorControlProps extends ColorIntensity {
  room: string;
  activeScene?: string;
  onPharosCmd: (scene: string) => void;
}

const PharosColorControl: React.FC<PharosColorControlProps> = ({
  icon: Icon,
  color,
  room,
  scene,
  activeScene,
  onPharosCmd,
}) => {
  const sendPharosCmd = usePharosApiState();

  const iconDisplay =
    Icon != null ? (
      <Icon className={classNames('h-8 w-8 text-primary')} />
    ) : null;

  return (
    <button
      className={classNames(
        'outline-none focus:outline-none border-4 flex items-center justify-center',
        'transition h-full rounded-[50%] border-primary overflow-hidden w-full max-w-[9rem] max-h-[9rem]',
        activeScene === scene ? 'scale-100' : 'scale-80',
      )}
      type="button"
      style={{
        backgroundColor: iconDisplay != null ? 'rgba(255,255,255,0.1)' : color,
      }}
      onClick={() => {
        sendPharosCmd({ room, scene })
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
      <div className="grid gap-2 w-full">
        {colorPalettes.map((row, index) => {
          return (
            <div
              key={`row-${index}`}
              className="h-[9rem] flex items-center justify-center space-x-3">
              {row}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomControl;
