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

interface Props {
  className?: string;
}

const TimeDisplay: React.FC<Props> = ({ className }: Props) => {
  const currTime = useTime('America/New_York');

  return (
    <div className={classNames('flex gap-4 items-center', className)}>
      <div className="flex flex-col gap-1">
        <p className="text-xl font-semibold leading-none text-yellow-500">
          {currTime.format('dddd')}
        </p>
        <p className="text-md font-light leading-none text-yellow-100">
          {currTime.format('MMMM Do YYYY')}
        </p>
      </div>
      <h3 className="text-5xl text-white font-semibold">
        {currTime.format('h:mma')}
        <span className="text-lg font-light text-yellow-100 ml-1">
          {currTime.format('z')}
        </span>
      </h3>
    </div>
  );
};

export default TimeDisplay;
