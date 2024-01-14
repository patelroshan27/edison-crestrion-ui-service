import type { ColorIntensity, PharosControlData } from 'utils/Configs';

import React from 'react';
import classNames from 'classnames';
import { useDigitalState, usePublishDigital } from 'utils/hooks';

const MAX_ROWS = 3;

const PharosColorControl: React.FC<ColorIntensity> = ({
  state,
  icon: Icon,
  color,
}: ColorIntensity) => {
  const isOn = useDigitalState(state);
  const publishOn = usePublishDigital(state);

  const iconDisplay =
    Icon != null ? (
      <Icon
        className={classNames(
          'h-8 w-8 text-primary',
          isOn ? 'text-black' : null,
        )}
      />
    ) : null;

  return (
    <button
      className={classNames(
        'flex items-center justify-center',
        'transition aspect-square rounded-[50%] overflow-hidden w-full max-w-[8rem]',
        isOn
          ? 'ring-4 ring-offset-4 ring-offset-black ring-primary scale-100'
          : 'scale-90',
        'text-black bg-primary',
      )}
      type="button"
      style={{
        backgroundColor: isOn && iconDisplay != null ? undefined : color,
      }}
      onClick={publishOn}>
      {iconDisplay}
    </button>
  );
};

interface Props {
  className?: string;
  config: PharosControlData;
}

const CustomControl: React.FC<Props> = ({ className, config }: Props) => {
  const rowModulous = Math.min(
    Math.ceil(config.colorStates.length / MAX_ROWS),
    3,
  );

  const rows: ColorIntensity[][] = config.colorStates.reduce<
    ColorIntensity[][]
  >((acc, item, index) => {
    const rowIndex = index % rowModulous;
    if (acc.at(rowIndex) == null) {
      acc[rowIndex] = [];
    }
    acc[rowIndex].push(item);
    return acc;
  }, []);

  const colorPalettes = rows.map((row, index) => {
    return row.map((item) => {
      return <PharosColorControl {...item} key={item.state} />;
    });
  });

  const getPlaceholder = (id: string): JSX.Element => (
    <div
      className="aspect-square rounded-full overflow-hidden w-full max-w-[8rem] bg-white/10"
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
      row.unshift(...fillers);
    } else {
      row.push(...fillers);
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
      <div className="grid py-12 gap-2 w-full">
        {elegantColorPalettes.map((row, index) => {
          return (
            <div
              key={`row-${index}`}
              className="flex items-center justify-center gap-3">
              {row}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomControl;
