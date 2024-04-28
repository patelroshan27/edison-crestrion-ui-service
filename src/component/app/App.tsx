import React, { useEffect } from 'react';
import classNames from 'classnames';
import Body from 'component/Body';
import Navigation from 'component/navigation/Navigation';
import { getConfigs } from 'config/Configs';
import LogoScreenSaver from 'component/LogoScreenSaver';
import LoginScreen from 'component/LoginScreen';
import { RoomSelection } from 'component/navigation/RoomSelection';
import { useRecoilState } from 'recoil';
import { LockButton } from 'component/navigation/LockButton';
import { FIFTEEN_MINUTES_IN_MS } from 'utils/Constants';
import { LOGGED_OUT_USER, loggedInUserState } from 'state/navigation';

const defaultConfig = getConfigs();
const { 
  authProviderURL,
  authID,
  proximityActivity,
  touchActivity,
  lockTimeout = FIFTEEN_MINUTES_IN_MS,
} = defaultConfig;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

interface Props {
  className?: string;
}

const App: React.FC<Props> = ({ className }) => {
  const [loggedInUser, setLoggedInUser] = useRecoilState(loggedInUserState);
  const isLoggedIn = Boolean(loggedInUser.role);
  const shouldAskForLogin = authProviderURL != null && authID != null;
  const panelContent = (
    <div
      className={classNames(
        'w-screen h-screen overflow-hidden flex flex-col',
        className,
      )}>
      <RoomSelection className="grow-0 shrink-0" />
      <Navigation className="grow-0 shrink-0" />
      <LockButton />
      <Body className="w-full h-full overflow-x-hidden overflow-y-auto no-scrollbar" />
    </div>
  );

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isLoggedIn) {
      timeout = setTimeout(() => {
        setLoggedInUser(LOGGED_OUT_USER);
      }, lockTimeout);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [isLoggedIn]);

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
