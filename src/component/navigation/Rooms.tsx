import React, { useState } from 'react';
import classNames from 'classnames';
import { useRecoilValue } from 'recoil';
import {
  activeConfigState,
} from 'state/navigation';
import { RoomKey, getConfigs } from 'config/Configs';

const defaultConfig = getConfigs();

interface Props {
  className?: string;
}

const Rooms: React.FC<Props> = ({ className }: Props) => {
  const activeConfig = useRecoilValue(activeConfigState);
  const [roomKey, setRoomKey] = useState<RoomKey>(defaultConfig.rooms[0]?.key);

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

export default Rooms;

