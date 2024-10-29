import React from 'react';
import classNames from 'classnames';
import { type SvgIcon } from 'types/appState';

export interface ButtonCommonProps {
  className?: string;
  icon: SvgIcon;
  iconOff?: SvgIcon;
  label: string;
  labelOff?: string;
  title?: string;
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
}: SimpleButtonProps) => {
  const IconWithOff = isOn ? Icon : IconOff;
  const IconDisplay = IconWithOff ?? Icon;
  const offLabel = labelOff ?? label;

  const displayLabel = (text: string): string => text.replace(' Lights', '');

  return (
    <button
      disabled={disabled}
      className={classNames(
        'transition-all rounded-lg flex items-center',
        'border border-neutral-400 bg-secondary',
        'focus:outline-none outline-none',
        // Base sizing and spacing - increased width for small screens
        'h-[3.2rem] px-1 py-1 w-[7.5rem]',
        // Tablet sizing and spacing
        'md:h-20 md:px-1.5 md:py-1 md:w-[9.5rem]',
        // Desktop sizing and spacing (1027x800)
        'lg:h-30 lg:px-2 lg:py-1 lg:w-[11rem]',
        // Colors and states
        isOn
          ? '!bg-active text-primary-foreground'
          : 'bg-background text-primary',
        disabled && 'cursor-default',
        disabled && !isOn && 'bg-slate-600',
        className,
      )}
      onClick={() => {
        onClick(!isOn);
      }}>
      <IconDisplay
        className={classNames(
          'shrink-0',
          'h-4 w-4',
          'md:h-5 md:w-5',
          'lg:h-6 lg:w-6',
          isOn ? 'text-primary-foreground' : 'text-primary',
        )}
      />
      <div
        className={classNames(
          'ml-1 md:ml-1 lg:ml-1.5',
          'flex-1 min-w-0',
          'pr-1',
        )}>
        <p
          className={classNames(
            'leading-tight font-semibold tracking-wide',
            'text-base',
            'md:text-lg',
            'lg:text-2xl',
            'whitespace-nowrap overflow-hidden text-ellipsis',
            isOn ? 'text-primary-foreground' : 'text-primary',
          )}>
          {isOn ? displayLabel(label) : displayLabel(offLabel)}
        </p>
      </div>
    </button>
  );
};
