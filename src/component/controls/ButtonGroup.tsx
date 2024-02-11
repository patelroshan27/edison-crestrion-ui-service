import React, { useState } from 'react';
import classNames from 'classnames';
import { type GroupControlData } from 'utils/Configs';
import Button from './Button';

interface ButtonGroupProps {
  data: GroupControlData;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({ data }) => {
  const [activeValue, setActiveValue] = useState<string | number>();

  return (
    <div
      className={classNames(
        'row-span-4 grid grid-cols-1 grid-rows-[1fr_1fr_1fr_1fr_1fr_1fr] gap-4',
        data.className,
      )}>
      {data.controls.map((button) => {
        return (
          <Button
            key={button.label}
            config={button}
            activeValue={activeValue}
            setActiveValue={setActiveValue}
          />
        );
      })}
    </div>
  );
};
