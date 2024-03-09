import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useRecoilState } from 'recoil';
import { activeConfigState, pageState } from 'state/navigation';
import { type RoomKey, getConfigs } from 'config/Configs';

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
  );
};
