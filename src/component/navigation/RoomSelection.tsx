import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { activeConfigState, isLoggedInState, pageState } from 'state/navigation';
import { type RoomKey, getConfigs } from 'config/Configs';
import { Lock } from 'lucide-react';

const defaultConfig = getConfigs();

interface RoomSelectionProps {
  className?: string;
}

export const RoomSelection: React.FC<RoomSelectionProps> = ({
  className,
}: RoomSelectionProps) => {
  const [activePage, setActivePage] = useRecoilState(pageState);
  const [, setActiveConfig] = useRecoilState(activeConfigState);
  const [roomKey, setRoomKey] = useState<RoomKey>(defaultConfig.rooms[0]?.key);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);

  useEffect(() => {
    const newConfig = getConfigs(roomKey);
    setActiveConfig(newConfig);

    // if current page doesn't exist in new room than set first tab of new config
    if (!newConfig.pages[activePage]) {
      setActivePage(Object.keys(newConfig.pages)[0]);
    }
  }, [roomKey]);

  return (
    <div
      className={classNames(
        'flex justify-between space-x-2 px-6 py-1 w-full items-center border-b border-primary',
        className,
      )}>
      <div className="flex items-center space-x-2">
        {
          <div className="flex items-center space-x-2">
            {defaultConfig.rooms.map((room) => {
              return (
                <button
                  key={room.key}
                  type="button"
                  className={classNames(
                    'px-4 py-4 flex items-center rounded-lg text-lg',
                    room.key === roomKey
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-white/10 text-primary',
                  )}
                  onClick={() => {
                    setRoomKey(room.key);
                  }}>
                  {room.title}
                </button>
              );
            })}
          </div>
        }
      </div>

      <div className="flex items-center space-x-4">
        <button
          type="button"
          className={classNames(
            'px-4 py-[0.57rem] flex items-center rounded-lg text-lg bg-primary text-primary-foreground',
          )}
          onClick={() => {
            setIsLoggedIn(false);
          }}>
          <Lock className="mr-3 h-6 w-6 text-lg" />
          <div className="text-left flex flex-col">
            <span className="leading-none text-sm">Lock</span>
            <span className="text-md">{defaultConfig.authID}</span>
          </div>
        </button>
      </div>
    </div>
  );
};
