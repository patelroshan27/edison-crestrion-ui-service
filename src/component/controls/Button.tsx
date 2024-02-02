import type { Intensity, LightControlData } from 'utils/Configs';

import React from 'react';
import classNames from 'classnames';
import {
  useAnalogState,
  useDigitalState,
  usePublishDigital,
} from 'utils/hooks';
import { type LucideIcon } from 'lucide-react';

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
      className={classNames(
        'transition-all rounded-lg flex px-4 py-4 justify-between border border-primary',
        'focus:outline-none outline-none space-x-4 items-center',
        isButtonActive ? 'bg-primary text-black' : 'text-primary',
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
  },
}: Props) => {
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
