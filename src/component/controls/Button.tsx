import type { Intensity, LightControlData } from 'utils/Configs';

import React, { useMemo } from 'react';
import classNames from 'classnames';
import {
  useAnalogState,
  useDigitalState,
  useMultipleSignalStates,
  usePublishDigital,
} from 'utils/hooks';
import { type LucideIcon } from 'lucide-react';

interface ButtonVerySimpleProps {
  className?: string;
  icon?: LucideIcon;
  label: string;
  state: string;
  stateOff: string;
}

const ButtonVerySimpleImpl: React.FC<ButtonVerySimpleProps> = ({
  state,
  stateOff,
  icon: Icon,
  label,
  className,
}: ButtonVerySimpleProps) => {
  const isOn = useDigitalState(state);
  const publishOn = usePublishDigital(state);
  const publishOff = usePublishDigital(stateOff);

  const handleToggle = (): void => {
    isOn ? publishOff() : publishOn();
  };

  const iconDisplay = Icon != null ? <Icon className="h-6 w-6" /> : null;

  return (
    <button
      className={classNames(
        'aspect-square rounded-lg font-semibold flex items-center justify-center',
        isOn ? 'text-black' : null,
        className,
      )}
      onClick={() => {
        handleToggle();
      }}>
      <div
        className={classNames(
          'aspect-square rounded-lg w-full m-0.5 flex items-center justify-center',
          isOn ? 'border-primary bg-black text-primary' : 'border-black',
        )}>
        {' '}
        {iconDisplay ?? label}
      </div>
    </button>
  );
};

interface ButtonCommonProps {
  analogFeedback?: string;
  intensityStates?: Intensity[];
  icon: LucideIcon;
  label: string;
  inverted?: boolean;
  title?: string;
}

interface ButtonImplProps extends ButtonCommonProps {
  isOn: boolean;
  onClick: (toggle: boolean) => void;
}

const ButtonImpl: React.FC<ButtonImplProps> = ({
  analogFeedback = '',
  icon: Icon,
  label,
  inverted,
  intensityStates,
  isOn,
  title,
  onClick,
}: ButtonImplProps) => {
  const feedback = useAnalogState(analogFeedback);
  const hasAnalogFeedback = analogFeedback.length > 0;

  const intensityState = useMemo(() => {
    return (intensityStates ?? []).map((intensity) =>
      typeof intensity === 'string' ? intensity : intensity.state,
    );
  }, [intensityStates]);
  const feedbacksForIntensities = useMultipleSignalStates(
    'boolean',
    intensityState,
  );
  const hasAtleastOneFeedbackOn = Object.entries(feedbacksForIntensities).some(
    ([, isFeedbackOn]) => isFeedbackOn,
  );

  const isActive = hasAnalogFeedback
    ? inverted
      ? feedback < 1
      : feedback >= 1
    : isOn;
  const intensities =
    intensityStates != null && intensityStates.length > 0
      ? intensityStates
      : [];
  const isButtonActive = isActive || hasAtleastOneFeedbackOn;

  return (
    <div
      className={classNames(
        'transition-all rounded-2xl flex p-6 justify-between border border-primary',
        isButtonActive ? 'bg-primary text-black' : 'bg-black text-primary',
        'aspect-square',
      )}>
      <button
        className="flex flex-col justify-between dh-full w-full"
        onClick={() => {
          onClick(!isButtonActive);
        }}>
        <div className="flex justify-between items-center">
          <div
            className={classNames(
              'flex w-14 aspect-square items-center justify-center text-2xl rounded-full',
              isButtonActive
                ? 'bg-black text-primary'
                : 'bg-primary text-black',
            )}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
        <div className={classNames('w-full text-start flex flex-col gap-1.5')}>
          <p
            className={classNames(
              'text-sm leading-none font-semibold',
              isButtonActive ? 'text-black' : 'text-secondary',
            )}>
            {title ?? 'Button'}
          </p>
          <p
            className={classNames(
              'text-2xl leading-none',
              isButtonActive ? 'text-black' : 'text-primary',
            )}>
            {label}
          </p>
        </div>
      </button>
      {intensities.length > 0 ? (
        <div className="grid grid-cols-1 gap-2 w-32">
          {intensities.map((intensity) => {
            return (
              <ButtonVerySimpleImpl
                className={
                  isButtonActive
                    ? 'border-3 border-black'
                    : 'border-1 border-primary text-primary'
                }
                key={intensity.state}
                state={intensity.state}
                stateOff={intensity.stateOff}
                icon={intensity.icon}
                label={intensity.name}
              />
            );
          })}
        </div>
      ) : null}
    </div>
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
  config: LightControlData;
}

const Button: React.FC<Props> = ({
  config: {
    icon,
    label,
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
        analogFeedback={analogFeedback}
        intensityStates={intensityStates}
        state={state}
        stateOff={stateOff}
        title={title}
        label={label}
        icon={icon}
      />
    );
  }

  return (
    <ButtonSimpleImpl
      analogFeedback={analogFeedback}
      intensityStates={intensityStates}
      state={state}
      title={title}
      label={label}
      icon={icon}
    />
  );
};

export default Button;
