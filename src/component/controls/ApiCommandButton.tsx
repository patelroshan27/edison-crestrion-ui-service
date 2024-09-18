import React from 'react';
import { useApiCommands } from 'utils/hooks';
import { type ButtonCommonProps, SimpleButton } from './SimpleButton';
import { type ApiCommand } from 'config/Configs';

interface ApiCommandButtonProps extends ButtonCommonProps {
  apiCommands: ApiCommand[];
  activeValue?: string | number;
  setActiveValue?: (val: string | number) => void;
  parseActiveValueKey?: (cmd: ApiCommand) => string;
}

export const ApiCommandButton: React.FC<ApiCommandButtonProps> = ({
  apiCommands,
  activeValue,
  setActiveValue,
  parseActiveValueKey,
  ...props
}) => {
  const sendCommands = useApiCommands();
  const valueKey = parseActiveValueKey?.(apiCommands[0]) ?? props.label;

  return (
    <SimpleButton
      {...props}
      isOn={activeValue === valueKey}
      disabled={activeValue === valueKey}
      onClick={() => {
        sendCommands(apiCommands)
          .then(() => setActiveValue?.(valueKey))
          .catch((err) => console.log(err));
      }}
    />
  );
};
