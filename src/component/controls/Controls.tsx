import type { ControlData } from 'config/Configs';
import React from 'react';
import Button from 'component/controls/Button';
import VolumeControl from 'component/controls/VolumeControl';
import PharosControl from 'component/controls/PharosControl';
import classNames from 'classnames';
import { ButtonGroup } from './ButtonGroup';
import { MediaPlayer } from 'component/media/MediaPlayer';

interface Props {
  className?: string;
  style?: React.CSSProperties;
  configs: { [key in string]: ControlData };
}

const Controls: React.FC<Props> = ({ className, configs, style }: Props) => {
  return (
    <div
      className={classNames(
        'grid h-full',
        'max-w-[380px] mx-auto',
        'w-full lg:max-w-none',
        'grid-cols-4 grid-rows-[1fr_1fr_1fr_1fr]',
        'gap-x-2 gap-y-2',
        'md:gap-x-3 md:gap-y-3',
        'lg:gap-x-4 lg:gap-y-3',
        className,
      )}
      style={style}>
      <div className="col-span-4 flex flex-row items-start relative">
        {/* ButtonGroup Container */}
        {Object.keys(configs).map((key) => {
          const data = configs[key];
          if (data.kind === 'group') {
            return (
              <div
                className={classNames(
                  'w-[150px]',
                  'flex-shrink-0',
                  'px-0.5 sm:px-2 md:px-3 lg:px-4',
                  'relative z-20',
                  'bg-background',
                )}
                key={key}>
                <ButtonGroup data={data} />
              </div>
            );
          }
          return null;
        })}

        {/* PharosControl Container */}
        {Object.keys(configs).map((key) => {
          const data = configs[key];
          if (data.kind === 'pharos') {
            return (
              <div
                className={classNames(
                  'absolute',
                  'z-10',
                  'left-[140px]',
                  'w-[220px]',
                  'pl-1',
                  'sm:left-[7rem] sm:w-[calc(100%-7rem)]',
                  'md:left-[11.5rem] md:w-[calc(100%-11.5rem)]',
                  'lg:left-[13rem] lg:w-[calc(100%-13rem)]',
                )}
                key={key}>
                <PharosControl
                  className={classNames(data.className)}
                  config={data}
                />
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* Other controls */}
      {Object.keys(configs).map((key) => {
        const data = configs[key];
        if (data.kind === 'light' || data.kind === 'toggle') {
          return (
            <div className="flex" key={key}>
              <Button config={data} />
            </div>
          );
        } else if (data.kind === 'audio') {
          return (
            <VolumeControl className="row-span-4" key={key} config={data} />
          );
        } else if (data.kind === 'mediaPlayer') {
          return <MediaPlayer key={key} playerId={data.playerId} />;
        }
        return null;
      })}
    </div>
  );
};

export default Controls;
