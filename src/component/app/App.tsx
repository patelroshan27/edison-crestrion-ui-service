import React from 'react';
import classNames from 'classnames';
import Body from 'component/Body';
import Navigation from 'component/navigation/Navigation';
import { getConfigs } from 'config/Configs';
import LogoScreenSaver from 'component/LogoScreenSaver';
import LoginScreen from 'component/LoginScreen';
import { RoomSelection } from 'component/navigation/RoomSelection';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from 'state/navigation';
import { LockButton } from 'component/navigation/LockButton';

const defaultConfig = getConfigs();
const { authProviderURL, authID, proximityActivity, touchActivity } =
  defaultConfig;

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
      <RoomSelection className="grow-0 shrink-0" />
      <Navigation className="grow-0 shrink-0" />
      <LockButton />
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
