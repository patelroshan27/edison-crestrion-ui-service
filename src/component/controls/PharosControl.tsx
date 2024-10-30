import type {
  ColorIntensity,
  LightsApiPayload,
  PharosControlData,
} from 'config/Configs';
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { usePharosApiState } from 'utils/hooks';

interface PharosColorControlProps extends ColorIntensity {
  room: string;
  activeScene?: string;
  extraPayloads?: LightsApiPayload[];
  onPharosCmd: (scene: string) => void;
  isLastInRow?: boolean;
  isSabhaHall?: boolean;
  totalButtons: number;
}

const PharosColorControl: React.FC<PharosColorControlProps> = ({
  icon: Icon,
  color,
  room,
  scene,
  name,
  activeScene,
  extraPayloads,
  onPharosCmd,
  isLastInRow = false,
  isSabhaHall = false,
  totalButtons,
}) => {
  const sendPharosCmd = usePharosApiState();

  const iconDisplay =
    Icon != null ? (
      <Icon
        className={classNames(
          'w-full h-full p-4',
          name === 'Off'
            ? 'text-neutral-700 dark:text-neutral-200'
            : 'text-primary',
        )}
      />
    ) : null;

  return (
    <button
      className={classNames(
        'outline-none focus:outline-none border-4',
        'flex items-center justify-center',
        'transition rounded-[50%] overflow-hidden',
        'w-16 h-16',
        'sm:w-14 sm:h-14',
        'md:w-10 md:h-10',
        'lg:w-28 lg:h-28',
        activeScene === scene
          ? 'border border-active rounded-2xl scale-100'
          : 'scale-90 hover:scale-95',
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
  containerWidth?: number;
}

const PharosControl: React.FC<Props> = ({
  className,
  config,
  containerWidth,
}: Props) => {
  const [activeScene, setActiveScene] = useState<string>();
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const isSabhaHall = config.colorStates.length > 20;

  const totalButtons = config.colorStates.length;

  // Screen size detection
  useEffect(() => {
    const isMediaMedium = containerWidth
      ? containerWidth >= 410 && containerWidth <= 1030
      : false;
    setIsMediumScreen(isMediaMedium);
  }, [containerWidth]);
  // Calculate items per row based on screen size
  const getItemsPerRow = (): number => {
    if (totalButtons > 30) {
      return isMediumScreen ? 6 : window.innerWidth >= 1024 ? 7 : 4;
    } else if (totalButtons > 20) {
      return isMediumScreen ? 5 : window.innerWidth >= 1024 ? 6 : 4;
    }
    return isMediumScreen ? 4 : window.innerWidth >= 1024 ? 5 : 3;
  };

  // Distribute items into rows
  const rows: ColorIntensity[][] = config.colorStates.reduce<
    ColorIntensity[][]
  >((acc, item, index) => {
    const itemsPerRow = getItemsPerRow();
    const rowIndex = Math.floor(index / itemsPerRow);
    if (!acc[rowIndex]) {
      acc[rowIndex] = [];
    }
    acc[rowIndex].push(item);
    return acc;
  }, []);

  const colorPalettes = rows.map((row, rowIndex) => (
    <div
      key={`row-${rowIndex}`}
      className={classNames(
        'flex items-center justify-center w-full',
        totalButtons > 20
          ? 'gap-1 md:gap-2 lg:gap-4'
          : 'gap-2 md:gap-4 lg:gap-6',
        'mb-2 md:mb-4 lg:mb-6',
      )}>
      {row.map((item, colIndex) => (
        <div
          key={`${config.room}${String(item.scene)}`}
          className={classNames('flex-1', 'flex items-center justify-center')}>
          <PharosColorControl
            {...item}
            room={config.room}
            activeScene={activeScene}
            extraPayloads={item.extraPayloads}
            onPharosCmd={setActiveScene}
            isLastInRow={colIndex === row.length - 1}
            isSabhaHall={isSabhaHall}
            totalButtons={totalButtons}
          />
        </div>
      ))}
    </div>
  ));

  return (
    <div
      className={classNames(
        'flex flex-col w-full h-full',
        'overflow-hidden',
        'p-2 md:p-3 lg:p-4',
        className,
      )}>
      <div
        className={classNames(
          'grid w-full h-full',
          'auto-rows-fr',
          'gap-2 md:gap-3 lg:gap-4',
        )}>
        {colorPalettes}
      </div>
    </div>
  );
};

export default PharosControl;
