import type {
  CrestronWebrelayConfig,
  Intensity,
  LightControlData,
} from 'utils/Configs';

import React, { useState } from 'react';
import classNames from 'classnames';
import {
  useAnalogState,
  useDigitalState,
  usePublishDigital,
  useWebRelayApiState,
} from 'utils/hooks';
import { type LucideIcon } from 'lucide-react';
import { useRecoilState } from 'recoil';
import { webRelayPendingState } from 'state/navigation';

interface ButtonCommonProps {
  className?: string;
  analogFeedback?: string;
  intensityStates?: Intensity[];
  icon: LucideIcon;
  iconOff?: LucideIcon;
  label: string;
  labelOff?: string;
  inverted?: boolean;
  title?: string;
}

interface ButtonImplProps extends ButtonCommonProps {
  isOn: boolean;
  onClick: (toggle: boolean) => void;
  disabled?: boolean;
}

const ButtonImpl: React.FC<ButtonImplProps> = ({
  className,
  analogFeedback = '',
  icon: Icon,
  iconOff: IconOff,
  label,
  labelOff,
  inverted,
  isOn,
  title,
  onClick,
  disabled,
}: ButtonImplProps) => {
  const feedback = useAnalogState(analogFeedback);
  const hasAnalogFeedback = analogFeedback.length > 0;

  const isActive = hasAnalogFeedback
    ? inverted
      ? feedback < 1
      : feedback >= 1
    : isOn;
  const isButtonActive = isActive;

  const IconWithOff = isButtonActive ? Icon : IconOff;
  const IconDisplay = IconWithOff ?? Icon;
  const offLabel = labelOff ?? label;

  return (
    <button
      disabled={disabled}
      className={classNames(
        'transition-all rounded-lg flex px-4 py-4 justify-between border border-primary',
        'focus:outline-none outline-none space-x-4 items-center',
        isButtonActive ? 'bg-primary text-primary' : 'bg-black text-primary',
        className,
      )}
      onClick={() => {
        onClick(!isButtonActive);
      }}>
      <IconDisplay
        className={classNames(
          'h-10 w-10',
          isButtonActive ? 'text-black' : 'text-primary',
        )}
      />
      <div className={classNames('w-full text-start flex flex-col space-y-1')}>
        <p
          className={classNames(
            'text-lg leading-none font-semibold',
            isButtonActive ? 'text-black' : 'text-secondary',
          )}>
          {title ?? 'Button'}
        </p>
        <p
          className={classNames(
            'text-3xl leading-none',
            isButtonActive ? 'text-black' : 'text-primary',
          )}>
          {isButtonActive ? label : offLabel}
        </p>
      </div>
    </button>
  );
};

interface ButtonSimpleImplProps extends ButtonCommonProps {
  state: string;
}

const ButtonSimpleImpl: React.FC<ButtonSimpleImplProps> = ({
  state,
  ...rest
}: ButtonSimpleImplProps) => {
  const isOn = useDigitalState(state);
  const publishOn = usePublishDigital(state);

  const handleToggle = (): void => {
    publishOn();
  };

  return <ButtonImpl isOn={isOn} onClick={handleToggle} {...rest} />;
};

interface ButtonOnOffImplProps extends ButtonCommonProps {
  state: string;
  stateOff: string;
}

const ButtonOnOffImpl: React.FC<ButtonOnOffImplProps> = ({
  state,
  stateOff,
  ...rest
}: ButtonOnOffImplProps) => {
  const sOn = rest.inverted ? stateOff : state;
  const sOff = rest.inverted ? state : stateOff;

  const isOn = useDigitalState(sOn);
  const publishOn = usePublishDigital(sOn);
  const publishOff = usePublishDigital(sOff);

  const handleToggle = (toggle: boolean): void => {
    toggle ? publishOn() : publishOff();
  };

  return <ButtonImpl isOn={isOn} onClick={handleToggle} {...rest} />;
};

interface ButtonRelayImplProps extends ButtonCommonProps {
  webRelayConfig: CrestronWebrelayConfig;
}

const ButtonWebrelayImpl: React.FC<ButtonRelayImplProps> = (props) => {
  const [active, setActive] = useState(false);
  const [webRelayPending, setWebRelayPending] =
    useRecoilState(webRelayPendingState);
  const sendWebRelay = useWebRelayApiState();

  return (
    <ButtonImpl
      disabled={webRelayPending}
      isOn={active}
      onClick={() => {
        setWebRelayPending(true);
        setActive(true);
        sendWebRelay(props.webRelayConfig.payload)
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setActive(false);
            setWebRelayPending(false);
          });
      }}
      {...props}
    />
  );
};

interface Props {
  className?: string;
  config: LightControlData;
}

const Button: React.FC<Props> = ({
  className,
  config: {
    icon,
    iconOff,
    label,
    labelOff,
    title,
    state,
    stateOff,
    intensityStates,
    analogFeedback,
    webRelayConfig,
  },
}: Props) => {
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

  if (stateOff != null) {
    return (
      <ButtonOnOffImpl
        className={className}
        analogFeedback={analogFeedback}
        intensityStates={intensityStates}
        state={state}
        stateOff={stateOff}
        title={title}
        label={label}
        labelOff={labelOff}
        icon={icon}
        iconOff={iconOff}
      />
    );
  }

  return (
    <ButtonSimpleImpl
      className={className}
      analogFeedback={analogFeedback}
      intensityStates={intensityStates}
      state={state}
      title={title}
      label={label}
      labelOff={labelOff}
      icon={icon}
      iconOff={iconOff}
    />
  );
};

export default Button;
