import classNames from 'classnames';
import { getConfigs } from 'utils/Configs';
import React from 'react';
import useTemperatureForRoomID from 'utils/useTemperatureForRoomID';

const configs = getConfigs();
const roomID = configs.id;

interface Props {
  className?: string;
}

const TemperatureDisplay: React.FC<Props> = ({ className }: Props) => {
  const { farenheit: tempInF, celcius: tempInC } =
    useTemperatureForRoomID(roomID);
  if (tempInF == null || tempInC == null) {
    return null;
  }

  return (
    <div
      className={classNames('flex flex-col gap-2 text-slate-300', className)}>
      <span className="text-md  leading-none text-slate-500">
        Current Temperature
      </span>
      <div className="flex gap-2 items-baseline">
        <span className="font-semibold text-6xl leading-none">{tempInC}</span>
        <span className="text-slate-500 leading-none">{tempInF}&#8457;</span>
      </div>
    </div>
  );
};

export default TemperatureDisplay;
