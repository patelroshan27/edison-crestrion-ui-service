import React from 'react';
import Body from 'component/Body';
import Navigation from 'component/navigation/Navigation';

import classNames from 'classnames';
import { getConfigs } from 'utils/Configs';
import LogoScreenSaver from 'component/LogoScreenSaver';

const { proximityActivity, touchActivity } = getConfigs();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

interface Props {
  className?: string;
}

const App: React.FC<Props> = ({ className }) => {
  return (
    <>
      {proximityActivity != null && touchActivity != null ? (
        <LogoScreenSaver
          proximityState={proximityActivity}
          touchState={touchActivity}
        />
      ) : null}
      <div
        className={classNames(
          'w-screen h-screen overflow-hidden flex flex-col',
          className,
        )}>
        <Navigation className="grow-0 shrink-0" />
        <Body className="w-full h-full overflow-x-hidden overflow-y-auto no-scrollbar" />
      </div>
    </>
  );
};

export default App;
