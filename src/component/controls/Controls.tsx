import type {
  AudioControlData,
  ControlData,
  LightControlData,
  MediaPlayerControlData,
} from 'config/Configs';
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

  const hasPharosControl = Object.values(configs).some(
    (data) => data.kind === 'pharos',
  );

  // Group audio controls together with type assertion
  const audioControls = Object.entries(configs)
    .filter(([_, data]) => data.kind === 'audio')
    .map(([key, data]) => ({
      key,
      data: data as AudioControlData,
    }));

  // Get other controls (light/toggle) with proper type assertion
  const otherControls = Object.entries(configs)
    .filter(([_, data]) => data.kind === 'light' || data.kind === 'toggle')
    .map(([key, data]) => ({
      key,
      data: data as LightControlData, // Type assertion here
    }));

  // Add media controls grouping
  const mediaControls = Object.entries(configs)
    .filter(([_, data]) => data.kind === 'mediaPlayer')
    .map(([key, data]) => ({
      key,
      data: data as MediaPlayerControlData,
    }));

  // Add a check for group controls
  const groupControls = Object.entries(configs).filter(
    ([_, data]) => data.kind === 'group'
  );

  const hasGroupControls = groupControls.length > 0;

  return (
    <div className={classNames('h-full flex')} style={style}>
      <div className="flex flex-row w-full h-full gap-4">
        {/* ButtonGroup Container - Only render if there are group controls */}
        {hasGroupControls && (
          <div
            ref={containerRef}
            className={classNames(
              'h-full flex-shrink-0',
              'sm:w-1/5 md:w-1/5 lg:w-2/5',
              'border-2 border-teal-500'
            )}>
            {groupControls.map(([key, data]) => (
              <div
                className={classNames(
                  'h-full relative bg-background overflow-hidden'
                )}
                key={key}>
                <ButtonGroup data={data} containerWidth={containerWidth} />
              </div>
            ))}
          </div>
        )}

        {/* Right Side Container - Adjust width based on whether group controls exist */}
        <div
          className={classNames(
            'h-full flex-grow',
            hasGroupControls
              ? 'sm:w-4/5 md:w-4/5 lg:w-3/5'
              : 'w-full', // Take full width if no group controls
            'flex flex-row gap-4 p-4'
          )}>
          {/* Volume Controls Container - Only render if there are audio controls */}
          {audioControls.length > 0 && (
            <div
              className={classNames(
                'flex flex-col gap-4',
                'sm:w-[45%] md:w-[50%] lg:w-[35%]',
              )}>
              {audioControls.map(({ key, data }) => (
                <VolumeControl
                  key={key}
                  className="flex-shrink-0 w-full"
                  config={data}
                  containerWidth={containerWidth}
                />
              ))}
            </div>
          )}

          {/* Other Buttons - Only render if there are other controls */}
          {otherControls.length > 0 && (
            <div className={classNames('flex flex-row flex-wrap gap-4')}>
              {otherControls.map(({ key, data }) => (
                <div className="flex" key={key}>
                  <Button config={data} containerWidth={containerWidth} />
                </div>
              ))}
            </div>
          )}

          {/* Media Player Controls */}
          {mediaControls.length > 0 && (
            <div className="w-full flex-grow">
              {mediaControls.map(({ key, data }) => (
                <div
                  key={key}
                  className="h-full w-full bg-background overflow-hidden px-2">
                  <MediaPlayer playerId={data.playerId} />
                </div>
              ))}
            </div>
          )}

          {/* PharosControl */}
          {hasPharosControl && (
            <div className="w-full flex-grow">
              {Object.keys(configs).map((key) => {
                const data = configs[key];
                if (data.kind === 'pharos') {
                  return (
                    <div
                      className={classNames(
                        'h-full w-full bg-background overflow-hidden px-2',
                        'flex justify-start',
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Controls;
