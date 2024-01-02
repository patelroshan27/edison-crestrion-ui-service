import axios from 'axios';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import classNames from 'classnames';

const SUN_CHECK_HOUR = 22;

const WEATHER_URL = new URL('https://api.open-meteo.com/v1/forecast');
WEATHER_URL.searchParams.set('latitude', '40.21');
WEATHER_URL.searchParams.set('longitude', '-74.62');
WEATHER_URL.searchParams.set('current_weather', 'true');
WEATHER_URL.searchParams.set('timezone', 'America/New_York');
WEATHER_URL.searchParams.set('daily', 'sunrise,sunset');

function getIconAndLabel(
  code: number,
  isDay: boolean,
): [string, React.ReactNode] | null {
  switch (code) {
    case 0:
      return [
        'Clear',
        <FontAwesomeIcon
          key="icon"
          icon={isDay ? icon({ name: 'sun' }) : icon({ name: 'moon' })}
        />,
      ];
    case 1:
    case 2:
    case 3:
      return [
        'Clouds',
        <FontAwesomeIcon
          key="icon"
          icon={
            isDay ? icon({ name: 'cloud-sun' }) : icon({ name: 'cloud-moon' })
          }
        />,
      ];
    case 45:
    case 48:
      return [
        'Fog',
        <FontAwesomeIcon key="icon" icon={icon({ name: 'smog' })} />,
      ];
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
      return [
        'Drizzle',
        <FontAwesomeIcon
          key="icon"
          icon={icon({ name: 'cloud-sun-rain', style: 'solid' })}
        />,
      ];
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
    case 80:
    case 81:
    case 82:
      return [
        'Rain',
        <FontAwesomeIcon
          key="icon"
          icon={icon({ name: 'cloud-showers-heavy' })}
        />,
      ];
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      return [
        'Snow',
        <FontAwesomeIcon key="icon" icon={icon({ name: 'snowflake' })} />,
      ];
    case 95:
    case 96:
    case 99:
      return [
        'Storm',
        <FontAwesomeIcon key="icon" icon={icon({ name: 'cloud-bolt' })} />,
      ];
  }
  return null;
}

interface WeatherIconProps {
  code: number | null;
  isDay: boolean;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({
  code,
  isDay,
}: WeatherIconProps) => {
  if (code == null) {
    return null;
  }

  const iconAndLabel = getIconAndLabel(code, isDay);
  if (iconAndLabel == null) {
    return null;
  }

  const [label, icon] = iconAndLabel;
  return (
    <span className="flex gap-1.5 items-center">
      {icon} {label}
    </span>
  );
};

interface Props {
  className?: string;
}

const WeatherDisplay: React.FC<Props> = ({ className }: Props) => {
  const [sunrise, setSunrise] = useState<string | null>(null);
  const [sunset, setSunset] = useState<string | null>(null);
  const [temperatureInC, setTemperatureInC] = useState<number | null>(null);
  const [weatherCode, setWeatherCode] = useState<number | null>(null);

  const now = moment();

  const handleDataUpdate = useCallback(async () => {
    const weatherData = await axios({
      url: WEATHER_URL.toString(),
      method: 'GET',
    });
    if (weatherData.status === axios.HttpStatusCode.Ok) {
      const nowText = (
        now.hour() >= SUN_CHECK_HOUR ? moment().add(1, 'd') : now
      ).format('YYYY-MM-DD');
      const indexForNow = weatherData.data?.daily?.time?.findIndex(
        (item: string) => item === nowText,
      );
      setTemperatureInC(weatherData.data?.current_weather?.temperature ?? null);
      setWeatherCode(weatherData.data?.current_weather?.weathercode ?? null);
      if (indexForNow >= 0) {
        setSunrise(weatherData.data?.daily?.sunrise?.at(indexForNow) ?? null);
        setSunset(weatherData.data?.daily?.sunset?.at(indexForNow) ?? null);
      }
    }
  }, [now]);

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

  return (
    <div
      className={classNames(
        'text-slate-500 text-sm flex gap-2 justify-between',
        className,
      )}>
      <WeatherIcon
        code={weatherCode}
        isDay={now.isAfter(moment(sunrise)) && now.isBefore(moment(sunset))}
      />
      {temperatureInC != null ? (
        <span className="flex gap-1.5 items-center">
          <FontAwesomeIcon
            icon={
              temperatureInC <= 10
                ? icon({ name: 'temperature-low', style: 'solid' })
                : icon({ name: 'temperature-high', style: 'solid' })
            }
          />
          {temperatureInC.toFixed(0)}&#8451; /{' '}
          {(temperatureInC * (9 / 5) + 32).toFixed(0)}&#8457;
        </span>
      ) : null}
      {now.hour() >= SUN_CHECK_HOUR ? (
        <span className="flex gap-1.5 items-center">
          <FontAwesomeIcon icon={icon({ name: 'sun', style: 'solid' })} />
          Sunrise {moment(sunrise).format('h:mma')}
        </span>
      ) : (
        <span className="flex gap-1.5 items-center">
          <FontAwesomeIcon icon={icon({ name: 'moon', style: 'solid' })} />
          Sunset {moment(sunset).format('h:mma')}
        </span>
      )}
    </div>
  );
};

export default WeatherDisplay;
