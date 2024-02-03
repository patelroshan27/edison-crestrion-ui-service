import type { ControlData } from 'utils/Configs';

import React from 'react';
import Button from 'component/controls/Button';
import VolumeControl from 'component/controls/VolumeControl';
import CustomControl from 'component/controls/CustomControl';
import PharosControl from 'component/controls/PharosControl';
import classNames from 'classnames';

interface Props {
  className?: string;
  style?: React.CSSProperties;
  configs: { [key in string]: ControlData };
}

const Controls: React.FC<Props> = ({ className, configs, style }: Props) => {
  return (
    <div
      className={classNames(
        'grid grid-cols-4 grid-rows-[1fr_1fr_1fr_1fr] gap-x-4 gap-y-3 h-full',
        className,
      )}
      style={style}>
      {Object.keys(configs).map((key) => {
        const data = configs[key];
        if (data.kind === 'light' || data.kind === 'toggle') {
          return <Button key={key} config={data} />;
        } else if (data.kind === 'audio') {
          return (
            <VolumeControl className="row-span-4" key={key} config={data} />
          );
        } else if (data.kind === 'custom') {
          return <CustomControl key={key} config={data} />;
        } else if (data.kind === 'pharos') {
          return (
            <PharosControl
              className="row-span-4 col-span-3"
              key={key}
              config={data}
            />
          );
        } else if (data.kind === 'group') {
          return (
            <div
              key={key}
              className={classNames(
                'row-span-4 grid grid-cols-1 grid-rows-[1fr_1fr_1fr_1fr_1fr_1fr] gap-4',
                data.className,
              )}>
              {data.controls.map((button) => {
                return <Button key={button.label} config={button} />;
              })}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default Controls;
