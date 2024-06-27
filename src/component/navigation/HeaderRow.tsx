import React, { type ReactNode } from 'react';
import classNames from 'classnames';

interface HeaderRowProps {
  className?: string;
  children: ReactNode;
}

export const HeaderRow: React.FC<HeaderRowProps> = ({
  className,
  children,
}) => {
  if (!children) return null;

  return (
    <div
      className={classNames(
        'flex justify-between space-x-2 px-6 py-2 w-full items-center border-b border-neutral-400',
        className,
      )}>
      <div className="flex items-center space-x-2">
        {<div className="flex items-center space-x-2">{children}</div>}
      </div>
    </div>
  );
};
