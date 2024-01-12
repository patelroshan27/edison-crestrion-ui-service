import React from 'react';
import classNames from 'classnames';
import TimeDisplay from 'component/navigation/TimeDisplay';
import WeatherDisplay from 'component/navigation/WeatherDisplay';

interface Props {
  className?: string;
}

const Navigation: React.FC<Props> = ({ className }: Props) => {
  return (
    <div
      className={classNames(
        'flex flex-col gap-4 px-5 py-6 w-[12rem] items-start bg-slate-900',
        className,
      )}>
      <TimeDisplay />
      <div className="h-full flex flex-col gap-3 justify-end w-full">
        <WeatherDisplay />
      </div>
    </div>
  );
};

export default Navigation;
