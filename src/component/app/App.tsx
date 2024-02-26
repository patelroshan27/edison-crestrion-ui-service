import React, { useEffect, useState } from 'react';
import Body from 'component/Body';
import Navigation from 'component/navigation/Navigation';

import classNames from 'classnames';
import { type RoomKey, getConfigs } from 'config/Configs';
import LogoScreenSaver from 'component/LogoScreenSaver';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  activeConfigState,
  isLoggedInState,
  pageState,
} from 'state/navigation';
import LoginScreen from 'component/LoginScreen';
import { Tabs, Tab } from '@nextui-org/react';

const defaultConfig = getConfigs();
const { authProviderURL, authID, proximityActivity, touchActivity } =
  defaultConfig;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

interface Props {
  className?: string;
}

const App: React.FC<Props> = ({ className }) => {
  const [activePage, setActivePage] = useRecoilState(pageState);
  const [, setActiveConfig] = useRecoilState(activeConfigState);
  const [roomKey, setRoomKey] = useState<RoomKey>(defaultConfig.rooms[0]?.key);
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const shouldAskForLogin = authProviderURL != null && authID != null;

  useEffect(() => {
    const newConfig = getConfigs(roomKey);
    setActiveConfig(newConfig);

    // if current page doesn't exist in new room than set first tab of new config
    if (!newConfig.pages[activePage]) {
      setActivePage(Object.keys(newConfig.pages)[0]);
    }
  }, [roomKey]);

  const panelContent = (
    <div
      className={classNames(
        'w-screen h-screen overflow-hidden flex flex-col',
        className,
      )}>
      <Navigation className="grow-0 shrink-0" />
      {defaultConfig.rooms.length === 0 && (
        <Body className="w-full h-full overflow-x-hidden overflow-y-auto no-scrollbar" />
      )}
      <Tabs
        aria-label="Options"
        size="lg"
        color="primary"
        className="justify-end mr-6 mt-2"
        onSelectionChange={(roomKey) => setRoomKey(roomKey as RoomKey)}>
        {defaultConfig.rooms.map((room) => (
          <Tab key={room.key} title={room.title}>
            <Body className="w-full h-full overflow-x-hidden overflow-y-auto no-scrollbar" />
          </Tab>
        ))}
      </Tabs>
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
