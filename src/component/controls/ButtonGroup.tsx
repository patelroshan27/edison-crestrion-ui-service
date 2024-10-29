import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { type GroupControlData } from 'config/Configs';
import Button from './Button';
import { useApiCommands } from 'utils/hooks';

interface ButtonGroupProps {
  data: GroupControlData;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({ data }) => {
  const { getActiveValue, parseActiveValueKey } = data;
  const [activeValue, setActiveValue] = useState<string | number>();
  const sendCommands = useApiCommands();
  const buttonCount = data.controls.length;
  const hasLessButtons = buttonCount <= 6;

  useEffect(() => {
    if (getActiveValue) {
      getActiveValue(sendCommands)
        .then((value) => setActiveValue(value))
        .catch((err) => console.log(err));
    }
  }, []);

  // Calculate dynamic height for each button
  const buttonHeight = buttonCount > 6
    ? `${Math.floor(600 / buttonCount)}px`
    : window.innerWidth >= 1026
    ? '3.5rem'
    : hasLessButtons
    ? `${Math.floor(650 / buttonCount)}px` // Distribute height evenly for small screens
    : '3.2rem';

  return (
    <div
      className={classNames(
        'flex flex-col flex-nowrap',
        'h-[650px] lg:h-[800px]',
        hasLessButtons ? 'justify-between' : 'gap-[0.1rem]', // Use justify-between for less buttons
        hasLessButtons ? 'lg:gap-[2.5rem]' : 'lg:gap-[0.3rem]',
        'w-[4rem] md:w-[9.5rem] lg:w-[11rem]',
        data.className,
      )}>
      <div className={classNames(
        'flex flex-col w-full flex-nowrap',
        hasLessButtons && 'h-full justify-between py-4', // Add padding and full height for less buttons
      )}>
        {data.controls.map((button, index) => (
          <div
            key={button.label}
            style={{ height: buttonHeight }}
            className={classNames(
              'w-full flex-shrink-0',
              !hasLessButtons && index !== data.controls.length - 1 && 'mb-[0.1rem]',
              hasLessButtons &&
                index !== data.controls.length - 1 &&
                'lg:mb-[2.5rem]',
            )}>
            <Button
              config={button}
              activeValue={activeValue}
              setActiveValue={setActiveValue}
              parseActiveValueKey={parseActiveValueKey}
              className="w-full h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
