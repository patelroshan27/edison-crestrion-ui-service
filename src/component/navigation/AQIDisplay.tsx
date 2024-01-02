import axios from 'axios';
import classNames from 'classnames';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';

const AQI_URL = new URL(
  'https://air-quality-api.open-meteo.com/v1/air-quality',
);
AQI_URL.searchParams.set('latitude', '40.52');
AQI_URL.searchParams.set('longitude', '-74.41');
AQI_URL.searchParams.set('hourly', 'us_aqi');
AQI_URL.searchParams.set('timezone', 'America/New_York');

function getLabel(aqi: number): string {
  if (aqi <= 50) {
    return 'Good';
  } else if (aqi > 50 && aqi <= 100) {
    return 'Moderate';
  } else if (aqi > 100 && aqi <= 200) {
    return 'Unhealthy';
  } else if (aqi > 200 && aqi <= 300) {
    return 'Very Unhealthy';
  }
  return 'Hazardous';
}

interface Props {
  className?: string;
}

const AQIDisplay: React.FC<Props> = ({ className }: Props) => {
  const [aqi, setAQI] = useState<number | null>(null);

  const handleDataUpdate = useCallback(async () => {
    const aqiData = await axios({ url: AQI_URL.toString(), method: 'GET' });
    if (aqiData.status === axios.HttpStatusCode.Ok) {
      const now = moment().format('YYYY-MM-DDTkk:00');
      const indexForNow = aqiData.data?.hourly?.time?.findIndex(
        (item: string) => item === now,
      );
      if (indexForNow >= 0) {
        setAQI(aqiData.data?.hourly?.us_aqi?.at(indexForNow) ?? null);
      }
    }
  }, []);

  useEffect(() => {
    const intervalID = setInterval(() => {
      handleDataUpdate().catch((error) => {
        console.error(error);
      });
    }, 1000 * 60 * 60);
    handleDataUpdate().catch((error) => {
      console.error(error);
    });
    return () => {
      clearInterval(intervalID);
    };
  }, [handleDataUpdate]);

  if (aqi == null) {
    return null;
  }

  return (
    <div
      className={classNames('flex flex-col gap-2 text-slate-300', className)}>
      <span className="text-md  leading-none text-slate-500">
        Air Quality Index
      </span>
      <div className="flex gap-2 items-end">
        <h3 className="font-light text-5xl leading-none">{aqi}</h3>
        <div
          className={classNames(
            'px-2 py-1 rounded-md w-fit text-xs font-semibold text-slate-900',
            aqi <= 50 ? 'bg-emerald-500' : null,
            aqi > 50 && aqi <= 100 ? 'bg-amber-300' : null,
            aqi > 100 && aqi <= 200 ? 'bg-amber-500' : null,
            aqi > 200 && aqi <= 300 ? 'bg-red-500' : null,
            aqi > 300 ? 'bg-red-800 text-white' : null,
          )}>
          {getLabel(aqi)}
        </div>
      </div>
    </div>
  );
};

export default AQIDisplay;
