import type { Intensity, LightControlData } from 'utils/Configs';

import React from 'react';
import { ConversionValues } from 'utils/Constants';
import classNames from 'classnames';
import {
  useAnalogState,
  useDigitalState,
  useMultipleSignalStates,
  usePublishDigital,
} from 'utils/hooks';
import { type IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ButtonVerySimpleProps {
  label: string;
  state: string;
  stateOff: string;
}

const ButtonVerySimpleImpl: React.FC<ButtonVerySimpleProps> = ({
  state,
  stateOff,
  label,
}: ButtonVerySimpleProps) => {
  const isOn = useDigitalState(state);
  const publishOn = usePublishDigital(state);
  const publishOff = usePublishDigital(stateOff);

  const handleToggle = (): void => {
    isOn ? publishOff() : publishOn();
  };

  return (
    <button
      className={classNames(
        'rounded-lg p-2 font-semibold',
        isOn ? 'bg-indigo-500 text-slate-100' : 'bg-slate-100 text-slate-900',
      )}
      onClick={() => {
        handleToggle();
      }}>
      {label}
    </button>
  );
};

interface ButtonCommonProps {
  analogFeedback?: string;
  intensityStates?: Intensity[];
  icon: IconDefinition;
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
  icon,
  label,
  inverted,
  intensityStates,
  isOn,
  title,
  onClick,
}: ButtonImplProps) => {
  const feedback = useAnalogState(analogFeedback);
  const hasAnalogFeedback = analogFeedback.length > 0;

  const feedbacksForIntensities = useMultipleSignalStates(
    'boolean',
    (intensityStates ?? []).map((intensity) =>
      typeof intensity === 'string' ? intensity : intensity.state,
    ),
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
        'rounded-2xl flex p-6 justify-between',
        isButtonActive
          ? 'bg-slate-900 text-slate-100'
          : 'bg-slate-200 text-slate-900',
        intensities.length > 0 ? 'col-span-2 ' : 'aspect-square',
      )}>
      <button
        className="flex flex-col justify-between h-full w-full"
        onClick={() => {
          onClick(!isButtonActive);
        }}>
        <div className="flex justify-between items-center">
          <div
            className={classNames(
              'flex w-14 aspect-square items-center justify-center text-2xl rounded-full',
              isButtonActive
                ? 'bg-indigo-500 text-slate-100'
                : 'bg-slate-100 text-slate-900',
            )}>
            <FontAwesomeIcon icon={icon} />
          </div>
          {hasAnalogFeedback ? (
            <div
              className={classNames(
                'flex gap-2 items-center text-sm font-semibold mr-2',
                isButtonActive ? 'text-indigo-500' : 'text-slate-400',
              )}>
              <p className={classNames('text-sm')}>
                {`${Math.round(
                  (feedback / ConversionValues.MAX_DECIMAL) * 100,
                )}%`}
              </p>
            </div>
          ) : null}
        </div>
        <div className={classNames('w-full text-start flex flex-col gap-1.5')}>
          <p className="text-sm leading-none font-semibold text-slate-500">
            {title ?? 'Button'}
          </p>
          <p
            className={classNames(
              'text-2xl leading-none',
              isButtonActive ? 'text-slate-200' : 'text-slate-900',
            )}>
            {label}
          </p>
        </div>
      </button>
      {intensities.length > 0 ? (
        <div className="grid grid-cols-1 gap-2 w-full">
          {intensities.map((intensity) => {
            return (
              <ButtonVerySimpleImpl
                key={intensity.state}
                state={intensity.state}
                stateOff={intensity.stateOff}
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
