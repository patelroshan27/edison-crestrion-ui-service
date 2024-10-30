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

  // console.log('SimpleButton:', {
  //   label,
  //   hasTwoColumns,
  //   isMediumScreen,
  //   containerWidth,
  // });

  const displayLabel = (text: string): string => text.replace(' Lights', '');

  return (
    <button
      disabled={disabled}
      className={classNames(
        'flex items-center',
        'justify-start',
        'gap-2 sm:gap-3',
        isMediumScreen ? (hasTwoColumns ? 'gap-4' : 'gap-8') : 'lg:gap-16',
        'p-2 sm:p-4',
        isMediumScreen ? (hasTwoColumns ? 'w-[95%]' : 'w-full') : 'w-full',
        'transition-all duration-200',
        'focus:outline-none outline-none',
        'rounded-lg',
        'px-2 sm:px-4',
        isMediumScreen ? (hasTwoColumns ? 'px-3' : 'px-5') : 'lg:px-10',
        'border border-neutral-400',
        isOn
          ? '!bg-active text-primary-foreground'
          : 'bg-secondary text-primary',
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
            'text-xl sm:text-3xl',
            isMediumScreen
              ? hasTwoColumns
                ? 'text-5xl'
                : 'text-8xl'
              : 'lg:text-[10rem]',
          )}
        />
        <span
          className={classNames(
            'text-base sm:text-xl',
            isMediumScreen
              ? hasTwoColumns
                ? 'text-3xl'
                : 'text-5xl'
              : 'lg:text-7xl',
            'whitespace-nowrap text-ellipsis',
            'min-w-0 flex-1',
            'text-left font-semibold',
          )}>
          {isOn ? displayLabel(label) : displayLabel(offLabel)}
        </span>
      </div>
    </button>
  );
};
