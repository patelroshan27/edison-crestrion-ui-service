import type { ControlData } from 'utils/Configs';

import React from 'react';
import Button from 'component/controls/Button';
import VolumeControl from 'component/controls/VolumeControl';
import CustomControl from 'component/controls/CustomControl';
import classNames from 'classnames';
import Temperature from './Temperature';

interface Props {
  className?: string;
  style?: React.CSSProperties;
  configs: { [key in string]: ControlData };
}

const Controls: React.FC<Props> = ({ className, configs, style }: Props) => {
  return (
    <div
      className={classNames(
        'grid grid-cols-[repeat(4,minmax(200px,1fr))] gap-4 h-full',
        className,
      )}
      style={style}>
      {Object.keys(configs).map((key) => {
        const data = configs[key];
        if (data.kind === 'light' || data.kind === 'toggle') {
          return <Button key={key} config={data} />;
        } else if (data.kind === 'temperature') {
          return (
            <Temperature
              className="col-span-3 row-span-2"
              config={data}
              key={key}
            />
          );
        } else if (data.kind === 'audio') {
          return (
            <VolumeControl className="row-span-2" key={key} config={data} />
          );
        } else if (data.kind === 'custom') {
          return <CustomControl key={key} config={data} />;
        }
        return null;
      })}
    </div>
  );
};

export default Controls;
