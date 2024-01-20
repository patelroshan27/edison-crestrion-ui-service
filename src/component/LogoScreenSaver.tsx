import React from 'react';
import classNames from 'classnames';
import { useDigitalState } from 'utils/hooks';

interface Props {
  proximityState: string;
  touchState: string;
}

const LogoScreenSaver: React.FC<Props> = ({
  proximityState,
  touchState,
}: Props) => {
  const isProximity = useDigitalState(proximityState);
  const isTouch = useDigitalState(touchState);
  if (isProximity || isTouch) {
    return null;
  }

  return (
    <div
      className={classNames(
        'flex items-center justify-center fixed top-0 left-0 h-screen w-screen z-10',
        'bg-[#2D2926]',
      )}>
      TEST
    </div>
  );
};

export default LogoScreenSaver;
