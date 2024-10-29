import type {
  ColorIntensity,
  LightsApiPayload,
  PharosControlData,
} from 'config/Configs';

import React, { useState } from 'react';
import classNames from 'classnames';
import { usePharosApiState } from 'utils/hooks';

interface PharosColorControlProps extends ColorIntensity {
  room: string;
  activeScene?: string;
  extraPayloads?: LightsApiPayload[];
  onPharosCmd: (scene: string) => void;
  isLastInRow?: boolean;
  isSabhaHall?: boolean;
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
}) => {
  const sendPharosCmd = usePharosApiState();

  const iconDisplay =
    Icon != null ? (
      <Icon
        className={classNames(
          name === 'Off'
            ? 'text-neutral-700 dark:text-neutral-200'
            : 'text-primary',
          isLastInRow
            ? isSabhaHall
              ? 'h-8 w-8 md:h-6 lg:h-[1.85rem] lg:w-[1.85rem]'
              : 'h-8 w-8 md:h-6 lg:h-[2.5rem] lg:w-[2.5rem]'
            : isSabhaHall
            ? 'h-7 w-7 md:h-5 lg:h-[1.7rem] lg:w-[1.7rem]'
            : 'h-7 w-7 md:h-5 lg:h-[2.3rem] lg:w-[2.3rem]',
        )}
      />
    ) : null;

  return (
    <button
      className={classNames(
        'outline-none focus:outline-none border-4 flex items-center justify-center',
        'transition rounded-[50%] overflow-hidden w-full',
        'h-[4.5rem] w-[4.5rem] md:h-12 md:w-12',
        isSabhaHall
          ? 'lg:h-[5.7rem] lg:w-[5.7rem]'
          : 'lg:h-[7.6rem] lg:w-[7.6rem]',
        'max-w-[7rem] max-h-[7rem]',
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

  const isSabhaHall = config.colorStates.length > 20;

  const itemsPerRow = window.innerWidth >= 1027 ? (isSabhaHall ? 7 : 5) : 3;

  const rows: ColorIntensity[][] = config.colorStates.reduce<
    ColorIntensity[][]
  >((acc, item, index) => {
    const rowIndex = Math.floor(index / itemsPerRow);
    if (acc[rowIndex] == null) {
      acc[rowIndex] = [];
    }
    acc[rowIndex].push(item);
    return acc;
  }, []);

  const colorPalettes = rows.map((row) => {
    return row.map((item, index) => (
      <PharosColorControl
        {...item}
        room={config.room}
        key={`${config.room}${String(item.scene)}`}
        activeScene={activeScene}
        extraPayloads={item.extraPayloads}
        onPharosCmd={setActiveScene}
        isLastInRow={index === row.length - 1}
        isSabhaHall={isSabhaHall}
      />
    ));
  });

  return (
    <div
      className={classNames(
        'flex w-full h-full items-start justify-center',
        'overflow-hidden pl-0 pr-0',
        'pt-2 lg:pt-4',
        className,
      )}>
      <div
        className={classNames(
          'grid w-full',
          'gap-[0.15rem]',
          'min-h-[650px] max-h-[680px]',
          'md:h-full md:gap-[0.2rem]',
          isSabhaHall ? 'lg:gap-[0.15rem]' : 'lg:gap-4',
          'lg:min-h-0 lg:max-h-none',
        )}>
        {colorPalettes.map((row, index) => (
          <div
            key={`row-${index}`}
            className={classNames(
              'flex items-center justify-center',
              'gap-[0.25rem] h-[3.5rem]',
              'md:gap-2 md:h-[3.8rem]',
              isSabhaHall ? 'lg:gap-[0.15rem] lg:h-24' : 'lg:gap-3 lg:h-28',
              className,
            )}>
            {row}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomControl;
