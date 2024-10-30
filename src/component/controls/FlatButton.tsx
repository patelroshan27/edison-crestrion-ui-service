import React from 'react';
import classNames from 'classnames';
import { type LucideIcon } from 'lucide-react';

interface Props {
  className?: string;
  label: string;
  iconDef: LucideIcon;
  onClick: () => void;
}

const FlatButton: React.FC<Props> = ({
  className,
  label,
  iconDef: Icon,
  onClick,
}: Props) => {
  return (
    <button
      className={classNames(
        'flex items-center justify-start',
        'rounded-lg',
        'transition-all duration-200',
        'focus:outline-none outline-none',
        // Responsive padding
        'sm:p-2 md:p-3 lg:p-4',
        // Responsive height
        'sm:h-14 md:h-16 lg:h-20',
        // Responsive gap
        'sm:gap-2 md:gap-3 lg:gap-4',
        className,
      )}
      onClick={onClick}>
      <Icon
        className={classNames(
          'shrink-0',
          // Responsive icon sizes
          'sm:text-2xl md:text-3xl lg:text-4xl',
        )}
      />
      <span
        className={classNames(
          'whitespace-nowrap text-ellipsis',
          'font-medium',
          // Responsive text sizes
          'sm:text-lg md:text-xl lg:text-2xl',
        )}>
        {label}
      </span>
    </button>
  );
};

export default FlatButton;
