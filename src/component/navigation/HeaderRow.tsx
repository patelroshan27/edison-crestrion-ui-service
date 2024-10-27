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
        'flex justify-between space-x-2 px-4 sm:px-5 md:px-6 py-2 w-full items-center border-b border-neutral-400',
        className,
      )}>
      <div className="flex items-center space-x-2 pr-40 sm:pr-48 md:pr-56">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(
              child as React.ReactElement<{ className?: string }>,
              {
                className: classNames(
                  'border border-neutral-400 bg-secondary px-2 sm:px-3 py-2 sm:py-3 flex items-center rounded-lg text-lg sm:text-xl md:text-2xl',
                  child.props.className,
                ),
              },
            );
          }
          return child;
        })}
      </div>
    </div>
  );
};
