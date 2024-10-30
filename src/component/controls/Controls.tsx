import type { ControlData } from 'config/Configs';
import React, { useRef, useEffect, useState } from 'react';
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  useEffect(() => {
    const updateWidth = (): void => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };

    updateWidth();
    const resizeObserver = new ResizeObserver(updateWidth);

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div
      className={classNames('h-full flex border-2 border-blue-500')}
      style={style}>
      <div className="flex flex-row w-full h-full">
        {/* ButtonGroup Container */}
        <div
          ref={containerRef}
          className={classNames(
            'h-full flex-shrink-0',
            'sm:w-1/5', // Small screen: 20%
            'md:w-1/5', // Medium screen: 20%
            'lg:w-2/5', // Large screen: 40%
          )}>
          {Object.keys(configs).map((key) => {
            const data = configs[key];
            if (data.kind === 'group') {
              return (
                <div
                  className={classNames(
                    'h-full relative bg-background overflow-hidden',
                    'border-2 border-green-500',
                  )}
                  key={key}>
                  <ButtonGroup data={data} containerWidth={containerWidth} />
                </div>
              );
            }
            return null;
          })}
        </div>

        {/* PharosControl Container */}
        <div
          className={classNames(
            'h-full flex-grow',
            'sm:w-4/5', // Small screen: 80%
            'md:w-4/5', // Medium screen: 80%
            'lg:w-3/5', // Large screen: 60%
          )}>
          {Object.keys(configs).map((key) => {
            const data = configs[key];
            if (data.kind === 'pharos') {
              return (
                <div
                  className={classNames(
                    'h-full w-full bg-background overflow-hidden',
                    'border-2 border-purple-500',
                    'px-2',
                  )}
                  key={key}>
                  <PharosControl
                    className={classNames(
                      data.className,
                      'h-full w-full',
                      'flex flex-col gap-2',
                    )}
                    config={data}
                    containerWidth={containerWidth}
                  />
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>

      {/* Other controls */}
      {Object.keys(configs).map((key) => {
        const data = configs[key];
        if (data.kind === 'light' || data.kind === 'toggle') {
          return (
            <div className={classNames('flex')} key={key}>
              <Button config={data} />
            </div>
          );
        } else if (data.kind === 'audio') {
          return (
            <VolumeControl
              className={classNames('row-span-4')}
              key={key}
              config={data}
            />
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
