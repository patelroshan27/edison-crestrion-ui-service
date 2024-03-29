import React from 'react';
import classNames from 'classnames';
import { type LucideIcon } from 'lucide-react';

export interface ButtonCommonProps {
  className?: string;
  icon: LucideIcon;
  iconOff?: LucideIcon;
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

  return (
    <button
      disabled={disabled}
      className={classNames(
        'transition-all rounded-lg flex px-4 py-4 justify-between border border-neutral-400',
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
