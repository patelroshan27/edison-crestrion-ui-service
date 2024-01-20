import React from 'react';
import Body from 'component/Body';
import Navigation from 'component/navigation/Navigation';

import classNames from 'classnames';
import { getConfigs } from 'utils/Configs';
import LogoScreenSaver from 'component/LogoScreenSaver';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from 'state/navigation';
import LoginScreen from 'component/LoginScreen';

const { authProviderURL, authID, proximityActivity, touchActivity } =
  getConfigs();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

interface Props {
  className?: string;
}

const App: React.FC<Props> = ({ className }) => {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const shouldAskForLogin = authProviderURL != null && authID != null;

  const panelContent = (
    <div
      className={classNames(
        'w-screen h-screen overflow-hidden flex flex-col',
        className,
      )}>
      <Navigation className="grow-0 shrink-0" />
      <Body className="w-full h-full overflow-x-hidden overflow-y-auto no-scrollbar" />
    </div>
  );

  return (
    <>
      {proximityActivity != null && touchActivity != null ? (
        <LogoScreenSaver
          proximityState={proximityActivity}
          touchState={touchActivity}
        />
      ) : null}
      {isLoggedIn || !shouldAskForLogin ? (
        panelContent
      ) : (
        <LoginScreen authID={authID} authProviderURL={authProviderURL} />
      )}
    </>
  );
};

export default App;
