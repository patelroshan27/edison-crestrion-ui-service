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

  useEffect(() => {
    if (getActiveValue) {
      getActiveValue(sendCommands)
        .then((value) => setActiveValue(value))
        .catch((err) => console.log(err));
    }
  }, []);

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
            parseActiveValueKey={parseActiveValueKey}
          />
        );
      })}
    </div>
  );
};
