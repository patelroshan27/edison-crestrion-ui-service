import type {
  ApiCommand,
  CrestronWebrelayConfig,
  LightControlData,
} from 'utils/Configs';

import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useApiCommands, useWebRelayApiState } from 'utils/hooks';
import { type LucideIcon } from 'lucide-react';
import { useRecoilState } from 'recoil';
import { webRelayPendingActionState } from 'state/navigation';

interface ButtonCommonProps {
  className?: string;
  icon: LucideIcon;
  iconOff?: LucideIcon;
  label: string;
  labelOff?: string;
  title?: string;
}

interface ButtonImplProps extends ButtonCommonProps {
  isOn: boolean;
  onClick: (toggle: boolean) => void;
  disabled?: boolean;
}

const ButtonImpl: React.FC<ButtonImplProps> = ({
  className,
  icon: Icon,
  iconOff: IconOff,
  label,
  labelOff,
  isOn,
  title,
  onClick,
  disabled,
}: ButtonImplProps) => {
  const IconWithOff = isOn ? Icon : IconOff;
  const IconDisplay = IconWithOff ?? Icon;
  const offLabel = labelOff ?? label;

  return (
    <button
      disabled={disabled}
      className={classNames(
        'transition-all rounded-lg flex px-4 py-4 justify-between border border-primary',
        'focus:outline-none outline-none space-x-4 items-center',
        isOn ? 'bg-primary text-primary' : 'bg-background text-primary',
        disabled && 'cursor-default',
        disabled && !isOn && 'bg-slate-600',
        className,
      )}
      onClick={() => {
        onClick(!isOn);
      }}>
      <IconDisplay
        className={classNames(
          'h-10 w-10',
          isOn ? 'text-primary-foreground' : 'text-primary',
        )}
      />
      <div className={classNames('w-full text-start flex flex-col space-y-1')}>
        <p
          className={classNames(
            'text-lg leading-none font-semibold',
            isOn ? 'text-primary-foreground' : 'text-primary',
          )}>
          {title ?? 'Button'}
        </p>
        <p
          className={classNames(
            'text-3xl leading-none',
            isOn ? 'text-primary-foreground' : 'text-primary',
          )}>
          {isOn ? label : offLabel}
        </p>
      </div>
    </button>
  );
};

interface ButtonRelayImplProps extends ButtonCommonProps {
  webRelayConfig: CrestronWebrelayConfig;
}

const ButtonWebrelayImpl: React.FC<ButtonRelayImplProps> = ({
  webRelayConfig,
  ...props
}) => {
  const pendingActionRef = useRef('');
  const [active, setActive] = useState(false);
  const [pendingAction, setPendingAction] = useRecoilState(
    webRelayPendingActionState,
  );
  const sendWebRelay = useWebRelayApiState();
  const actionKey = props.title ?? props.label;

  useEffect(() => {
    pendingActionRef.current = pendingAction;
    if (!pendingAction && active) setActive(false);
  }, [pendingAction]);

  const shouldUpdate = (): boolean =>
    !pendingActionRef.current || pendingActionRef.current === actionKey;

  return (
    <ButtonImpl
      disabled={
        active ||
        (Boolean(pendingAction) && webRelayConfig.payload.action !== 'STOP')
      }
      isOn={active}
      onClick={() => {
        shouldUpdate() && setPendingAction(actionKey);
        setActive(true);
        sendWebRelay(webRelayConfig.payload)
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            shouldUpdate() && setPendingAction('');
          });
      }}
      {...props}
    />
  );
};

interface ApiCommandButtonProps extends ButtonCommonProps {
  apiCommands: ApiCommand[];
  activeValue?: string | number;
  setActiveValue?: (val: string | number) => void;
}

const ApiCommandButton: React.FC<ApiCommandButtonProps> = ({
  apiCommands,
  activeValue,
  setActiveValue,
  ...props
}) => {
  const sendCommands = useApiCommands();

  return (
    <ButtonImpl
      {...props}
      isOn={activeValue === props.label}
      onClick={() => {
        sendCommands(apiCommands)
          .then(() => setActiveValue?.(props.label))
          .catch((err) => console.log(err));
      }}
    />
  );
};

interface Props {
  className?: string;
  config: LightControlData;
  activeValue?: string | number;
  setActiveValue?: (val: string | number) => void;
}

const Button: React.FC<Props> = ({
  className,
  config: {
    icon,
    iconOff,
    label,
    labelOff,
    title,
    webRelayConfig,
    apiCommands,
  },
  activeValue,
  setActiveValue,
}: Props) => {
  if (apiCommands) {
    return (
      <ApiCommandButton
        className={className}
        title={title}
        label={label}
        labelOff={labelOff}
        icon={icon}
        iconOff={iconOff}
        apiCommands={apiCommands}
        activeValue={activeValue}
        setActiveValue={setActiveValue}
      />
    );
  }

  // TODO integrate below using ApiCommandButton component
  if (webRelayConfig) {
    return (
      <ButtonWebrelayImpl
        className={className}
        title={title}
        label={label}
        labelOff={labelOff}
        icon={icon}
        iconOff={iconOff}
        webRelayConfig={webRelayConfig}
      />
    );
  }

  return null;
};

export default Button;
