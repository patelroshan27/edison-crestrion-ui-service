import React from 'react';
import classNames from 'classnames';
import TimeDisplay from 'component/navigation/TimeDisplay';
import TemperatureDisplay from 'component/navigation/TemperatureDisplay';
import WeatherDisplay from 'component/navigation/WeatherDisplay';

import logoImage from '../../assets/logo-dark.png';

interface Props {
  className?: string;
}

const Navigation: React.FC<Props> = ({ className }: Props) => {
  return (
    <div
      className={classNames(
        'flex flex-col gap-4 px-5 py-6 w-[22rem] items-start bg-slate-900',
        className,
      )}>
      <div
        className="flex items-center justify-center rounded-xl shadow-xl"
        style={{ backgroundColor: '#E5DECF' }}>
        <img className="max-w-[80%]" alt="hero" src={logoImage} />
      </div>
      <TimeDisplay />
      <div className="h-full flex flex-col gap-3 justify-end w-full">
        <TemperatureDisplay />
        <WeatherDisplay />
      </div>
    </div>
  );
};

export default Navigation;
