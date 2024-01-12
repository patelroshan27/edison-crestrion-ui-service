import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import classNames from 'classnames';

function useTime(timezone: string): moment.Moment {
  const [currMoment, setCurrMoment] = useState(moment.tz(timezone));
  useEffect(() => {
    const intervalID = setInterval(() => {
      setCurrMoment(moment.tz(timezone));
    }, 1000);
    return () => {
      clearInterval(intervalID);
    };
  });
  return currMoment;
}

interface TimeForZoneProps {
  flag: string;
  zone: string;
  city?: string;
}

const TimeForZone: React.FC<TimeForZoneProps> = ({
  flag,
  zone,
  city,
}: TimeForZoneProps) => {
  const timeForZone = useTime(zone);
  return (
    <div className="flex gap-3 items-center">
      <img
        alt="india"
        src={`http://flagsapi.com/${flag.toUpperCase()}/flat/64.png`}
        className="w-[34px]"
      />
      <h3 className="flex gap-1.5 items-end leading-tight text-xl text-slate-100">
        {timeForZone.format('h:mm A')}
        <span className="text-sm font-light text-slate-500">
          {city ?? zone.split('/').at(1) ?? timeForZone.format('z')}
        </span>
      </h3>
    </div>
  );
};

interface Props {
  className?: string;
}

const TimeDisplay: React.FC<Props> = ({ className }: Props) => {
  const currTime = useTime('America/New_York');

  return (
    <div
      className={classNames('text-slate-200 flex flex-col gap-2', className)}>
      <div className="flex flex-col gap-1">
        <p className="text-lg font-semibold leading-none text-slate-300">
          {currTime.format('dddd')}
        </p>
        <p className="text-sm font-light leading-none text-slate-300">
          {currTime.format('MMMM Do YYYY')}
        </p>
      </div>
      <h3 className="text-3xl text-indigo-400 font-semibold">
        {currTime.format('h:mm A')}
        <span className="text-lg font-light text-slate-500 ml-1">
          {currTime.format('z')}
        </span>
      </h3>
      <div className="flex flex-col">
        <TimeForZone flag="GB" zone="Europe/London" />
        <TimeForZone flag="KE" zone="Africa/Nairobi" />
        <TimeForZone flag="AE" zone="Asia/Dubai" />
        <TimeForZone flag="IN" zone="Asia/Calcutta" city="Mumbai" />
        <TimeForZone flag="AU" zone="Australia/Sydney" />
      </div>
    </div>
  );
};

export default TimeDisplay;
