import React from 'react';
import { ButtonWebrelay } from './ButtonWebrelay';
import { ApiCommandButton } from './ApiCommandButton';
import { type LightControlData, type ApiCommand } from 'config/Configs';

interface Props {
  className?: string;
  config: LightControlData;
  activeValue?: string | number;
  setActiveValue?: (val: string | number) => void;
  parseActiveValueKey?: (cmd: ApiCommand) => string;
}

const Button: React.FC<Props> = ({
  className,
  config: { apiCommands, webRelayConfig, ...configProps },
  ...props
}: Props) => {
  if (apiCommands) {
    return (
      <ApiCommandButton
        {...configProps}
        {...props}
        className={className}
        apiCommands={apiCommands}
      />
    );
  }

  if (webRelayConfig) {
    return (
      <ButtonWebrelay
        {...configProps}
        {...props}
        className={className}
        webRelayConfig={webRelayConfig}
      />
    );
  }

  return null;
};

export default Button;
