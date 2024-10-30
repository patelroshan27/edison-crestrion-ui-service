import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { type SvgIcon } from 'types/appState';

export interface ButtonCommonProps {
  className?: string;
  icon: SvgIcon;
  iconOff?: SvgIcon;
  label: string;
  labelOff?: string;
  title?: string;
  hasTwoColumns?: boolean;
  containerWidth?: number;
}

interface SimpleButtonProps extends ButtonCommonProps {
  isOn: boolean;
  onClick: (toggle: boolean) => void;
  disabled?: boolean;
}

export const SimpleButton: React.FC<SimpleButtonProps> = ({
  className,
  icon: Icon,
  iconOff: IconOff,
  label,
  labelOff,
  isOn,
  title,
  onClick,
  disabled,
  hasTwoColumns,
  containerWidth,
}: SimpleButtonProps) => {
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const IconWithOff = isOn ? Icon : IconOff;
  const IconDisplay = IconWithOff ?? Icon;
  const offLabel = labelOff ?? label;
  useEffect(() => {
    const isMediaMedium = containerWidth
      ? containerWidth >= 410 && containerWidth <= 1030
      : false;
    setIsMediumScreen(isMediaMedium);
  }, [containerWidth]);

  console.log('SimpleButton:', {
    label,
    hasTwoColumns,
    isMediumScreen,
    containerWidth,
  });

  const displayLabel = (text: string): string => text.replace(' Lights', '');

  return (
    <button
      disabled={disabled}
      className={classNames(
        'flex items-center',
        'justify-start',
        'gap-3',
        isMediumScreen
          ? hasTwoColumns
            ? 'gap-4'
            : 'gap-8'
          : 'gap-3 lg:gap-16',
        'p-4',
        isMediumScreen ? (hasTwoColumns ? 'w-[95%]' : 'w-full') : 'w-full',
        'transition-all duration-200',
        'focus:outline-none outline-none',
        'rounded-lg',
        isMediumScreen ? (hasTwoColumns ? 'px-3' : 'px-5') : 'px-4 lg:px-10',
        isOn
          ? 'bg-secondary text-white'
          : 'bg-default-100 text-default-800 hover:bg-default-200',
        disabled && 'cursor-default opacity-50',
        className,
      )}
      onClick={() => {
        onClick(!isOn);
      }}>
      <div
        className={classNames(
          'flex items-center',
          'w-full',
          isMediumScreen
            ? hasTwoColumns
              ? 'gap-4'
              : 'gap-8'
            : 'gap-3 lg:gap-16',
        )}>
        <IconDisplay
          className={classNames(
            'shrink-0',
            isMediumScreen
              ? hasTwoColumns
                ? 'text-5xl'
                : 'text-8xl'
              : 'text-3xl lg:text-[10rem]',
            isOn ? 'text-white' : 'text-default-800',
          )}
        />
        <span
          className={classNames(
            isMediumScreen
              ? hasTwoColumns
                ? 'text-3xl'
                : 'text-5xl'
              : 'text-xl lg:text-7xl',
            'whitespace-nowrap text-ellipsis',
            'min-w-0 flex-1',
            'text-left font-semibold',
            isOn ? 'text-white' : 'text-default-800',
          )}>
          {isOn ? displayLabel(label) : displayLabel(offLabel)}
        </span>
      </div>
    </button>
  );
};
