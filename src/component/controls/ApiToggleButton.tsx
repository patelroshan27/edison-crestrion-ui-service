import React, { useEffect, useState } from 'react';
import { useApiCommands } from 'utils/hooks';
import { type ButtonCommonProps, SimpleButton } from './SimpleButton';
import { type ApiCommand } from 'config/Configs';

interface ApiToggleButtonProps extends ButtonCommonProps {
  onApiCommands: ApiCommand[];
  offApiCommands?: ApiCommand[];
  getActiveState: (
    sendCommands: (commands: ApiCommand[]) => Promise<unknown[]>,
  ) => Promise<boolean>;
}

export const ApiToggleButton: React.FC<ApiToggleButtonProps> = ({
  onApiCommands,
  offApiCommands,
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
        const cmds =
          isActive && offApiCommands ? offApiCommands : onApiCommands;
        sendCommands(cmds)
          .then(() => setActive((prev) => !prev))
          .catch((err) => console.log(err))
          .finally(() => setIsPending(false));
      }}
    />
  );
};
