import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { type GroupControlData } from 'config/Configs';
import Button from './Button';
import { useApiCommands } from 'utils/hooks';

interface ButtonGroupProps {
  data: GroupControlData;
  containerWidth: number;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  data,
  containerWidth,
}) => {
  const { getActiveValue, parseActiveValueKey } = data;
  const [activeValue, setActiveValue] = useState<string | number>();
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const sendCommands = useApiCommands();

  // Business logic for active value
  useEffect(() => {
    if (getActiveValue) {
      getActiveValue(sendCommands)
        .then((value) => setActiveValue(value))
        .catch((err) => console.log(err));
    }
  }, [getActiveValue, sendCommands]);

  // Screen size detection using containerWidth
  useEffect(() => {
    const isMediaMedium = containerWidth >= 410 && containerWidth <= 1030;
    setIsMediumScreen(isMediaMedium);
  }, [containerWidth]);

  const buttonCount = data.controls.length;
  const needsTwoColumns = buttonCount > 6 && isMediumScreen;

  // Split buttons into columns
  const buttonsPerColumn = needsTwoColumns
    ? Math.ceil(buttonCount / 2)
    : buttonCount;
  const firstColumnButtons = data.controls.slice(0, buttonsPerColumn);
  const secondColumnButtons = needsTwoColumns
    ? data.controls.slice(buttonsPerColumn)
    : [];

  const getButtonHeight = (colButtonCount: number): string => {
    return `h-[${Math.floor(100 / colButtonCount)}%]`;
  };

  const renderButtonColumn = (
    buttons: typeof data.controls,
    columnIndex: number,
  ): JSX.Element => (
    <div className="flex flex-col h-full w-full gap-2">
      {buttons.map((button) => (
        <div
          key={button.label}
          className={classNames(
            'flex-1',
            getButtonHeight(buttons.length),
            'min-h-0',
          )}>
          <Button
            config={button}
            activeValue={activeValue}
            setActiveValue={setActiveValue}
            parseActiveValueKey={parseActiveValueKey}
            hasTwoColumns={needsTwoColumns}
            containerWidth={containerWidth}
            className={classNames(
              'flex items-center justify-start',
              'gap-3 p-4',
              'text-left w-full h-full',
              'rounded-lg',
              'transition-colors duration-200',
            )}
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col h-full w-full bg-background dark:bg-background-dark overflow-hidden">
      <div
        className={classNames(
          'h-full w-full p-2',
          'sm:flex sm:flex-col',
          needsTwoColumns ? 'md:grid md:grid-cols-2 md:gap-2' : 'flex flex-col',
        )}>
        {renderButtonColumn(firstColumnButtons, 0)}
        {needsTwoColumns && renderButtonColumn(secondColumnButtons, 1)}
      </div>
    </div>
  );
};
