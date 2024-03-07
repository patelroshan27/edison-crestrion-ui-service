import type { ControlData } from 'config/Configs';

import React from 'react';
import Button from 'component/controls/Button';
import VolumeControl from 'component/controls/VolumeControl';
import PharosControl from 'component/controls/PharosControl';
import classNames from 'classnames';
import { ButtonGroup } from './ButtonGroup';

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
        } else if (data.kind === 'pharos') {
          return (
            <PharosControl
              className="row-span-4 col-span-3"
              key={key}
              config={data}
            />
          );
        } else if (data.kind === 'group') {
          return <ButtonGroup key={key} data={data} />;
        }
        return null;
      })}
    </div>
  );
};

export default Controls;
