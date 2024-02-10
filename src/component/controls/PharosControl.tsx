import type { ColorIntensity, PharosControlData } from 'utils/Configs';

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
        activeScene === scene ? 'scale-100' : 'opacity-50 scale-90',
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

  const getPlaceholder = (id: string): JSX.Element => (
    <div
      className="rounded-full overflow-hidden w-full h-full bg-white/10 max-w-[9rem] max-h-[9rem]"
      key={id}
    />
  );

  let lastInsert = 1;
  const elegantColorPalettes = colorPalettes.map((row, index) => {
    if (index === 0) {
      return row;
    }

    const lastRowLength = colorPalettes[index - 1].length;
    const delta = lastRowLength - row.length;
    let fillers: JSX.Element[] = [];
    if (lastRowLength === row.length) {
      fillers = [getPlaceholder(`placeholder-${index}`)];
    } else if (delta > 1) {
      fillers = new Array(delta - 1)
        .fill(0)
        .map((_, i) => getPlaceholder(`placeholder-${index}-${i}`));
    } else {
      return row;
    }

    if (lastInsert === 1) {
//      row.unshift(...fillers);
    } else {
  //    row.push(...fillers);
    }
    lastInsert *= -1;

    return row;
  });

  return (
    <div
      className={classNames(
        'flex w-full h-full items-center justify-center',
        className,
      )}>
      <div className="grid gap-2 w-full">
        {elegantColorPalettes.map((row, index) => {
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
