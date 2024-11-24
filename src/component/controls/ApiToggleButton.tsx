import React, { useEffect, useState } from 'react';
import { useApiCommands } from 'utils/hooks';
import { type ButtonCommonProps, SimpleButton } from './SimpleButton';
import { type ApiCommand } from 'config/Configs';

interface ApiToggleButtonProps extends ButtonCommonProps {
  apiCommands: ApiCommand[];
  getActiveState: (
    sendCommands: (commands: ApiCommand[]) => Promise<unknown[]>,
  ) => Promise<boolean>;
}

export const ApiToggleButton: React.FC<ApiToggleButtonProps> = ({
  apiCommands,
  ...props
}) => {
  const [isPending, setIsPending] = useState(false);
  const [isActive, setActive] = useState(false);
  const sendCommands = useApiCommands();

  useEffect(() => {
    props
      .getActiveState(sendCommands)
      .then(setActive)
      .catch((err) => console.log(err));
  }, []);

  return (
    <SimpleButton
      {...props}
      isOn={isActive}
      disabled={isPending}
      onClick={() => {
        setIsPending(true);
        sendCommands(apiCommands)
          .then(() => setActive((prev) => !prev))
          .catch((err) => console.log(err))
          .finally(() => setIsPending(false));
      }}
    />
  );
};
