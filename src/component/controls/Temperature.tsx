import { getConfigs, type TemperatureControlData } from 'utils/Configs';

import React from 'react';
import classNames from 'classnames';
import useTemperatureForRoomID from 'utils/useTemperatureForRoomID';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import FlatButton from './FlatButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const configs = getConfigs();
const roomID = configs.id;

interface Props {
  className?: string;
  config: TemperatureControlData;
}

const Temperature: React.FC<Props> = ({ className, config }: Props) => {
  const {
    farenheit: tempInF,
    celcius: tempInC,
    increase,
    decrease,
  } = useTemperatureForRoomID(roomID, true, 0);
  if (tempInF == null || tempInC == null) {
    return null;
  }

  return (
    <div
      className={classNames(
        'bg-slate-200 rounded-2xl',
        'flex flex-col items-start justify-start gap-2 p-6',
        className,
      )}>
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-3">
          <div
            className={classNames(
              'flex w-14 shrink-0 grow-0 aspect-square items-center justify-center text-2xl rounded-full',
              'bg-slate-100 text-slate-900',
            )}>
            <p className="text-xl font-semibold">
              <FontAwesomeIcon icon={icon({ name: 'fan' })} />
            </p>
          </div>
          <div
            className={classNames('w-full text-start flex flex-col gap-1.5')}>
            <p className="text-sm leading-none font-semibold text-slate-500">
              HVAC
            </p>
            <p className={classNames('text-lg leading-none text-slate-900')}>
              Set Temperature
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-baseline justify-start">
        <span className="text-[200px] leading-none font-bold">{tempInC}</span>
        <span className="text-xl text-slate-500 leading-none">
          &#8451; / {tempInF}&#8457;
        </span>
      </div>
      <div className="flex gap-4 h-32 items-center justify-start w-full">
        <FlatButton
          className="aspect-square bg-slate-100 text-slate-900"
          label="Decrease"
          iconDef={icon({ name: 'temperature-arrow-down' })}
          onClick={() => {
            decrease().catch(console.error);
          }}
        />
        <FlatButton
          className="aspect-square bg-slate-100 text-slate-900"
          label="Increase"
          iconDef={icon({ name: 'temperature-arrow-up' })}
          onClick={() => {
            increase().catch(console.error);
          }}
        />
      </div>
    </div>
  );
};

export default Temperature;
