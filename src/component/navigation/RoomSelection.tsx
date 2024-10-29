import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  activeConfigState,
  loggedInUserState,
  pageState,
} from 'state/navigation';
import { type RoomKey, getConfigs } from 'config/Configs';
import { getAllowedPages } from 'utils/getAllowedPages';
import { HeaderRow } from './HeaderRow';
import classNames from 'classnames';

const defaultConfig = getConfigs();

interface RoomSelectionProps {
  className?: string;
}

export const RoomSelection: React.FC<RoomSelectionProps> = ({
  className,
}: RoomSelectionProps) => {
  const [, setActivePage] = useRecoilState(pageState);
  const [, setActiveConfig] = useRecoilState(activeConfigState);
  const loggedInUser = useRecoilValue(loggedInUserState);
  const [roomKey, setRoomKey] = useState<RoomKey>(defaultConfig.rooms[0]?.key);
  const [selectedGroup, setSelectedGroup] = useState<string | undefined>(
    defaultConfig.rooms[0]?.group,
  );
  const rooms = defaultConfig.rooms.filter((r) => r.group === selectedGroup);

  useEffect(() => {
    const newConfig = getConfigs(roomKey);
    setActiveConfig(newConfig);
    setActivePage(getAllowedPages(newConfig, loggedInUser)[0]);
  }, [roomKey]);

  useEffect(() => {
    const newRoomKey = rooms[0]?.key;
    newRoomKey && setRoomKey(newRoomKey);
  }, [selectedGroup]);

  if (!defaultConfig.rooms.length) return null;

  const groups = Object.keys(
    defaultConfig.rooms.reduce<Record<string, number>>((prev, curr) => {
      if (curr.group) {
        prev[curr.group] = 1;
      }
      return prev;
    }, {}),
  );

  const selectedGroupName = selectedGroup ?? 'Select Group';
  const selectedRoomName =
    rooms.find((r) => r.key === roomKey)?.title ?? 'Select Room';

  return (
    <div className="flex flex-row md:flex-col w-full">
      {groups.length > 0 && (
        <div className="w-[40%] md:w-auto pr-0.5 md:pr-0">
          <HeaderRow label={selectedGroupName}>
            {groups.map((group) => (
              <button
                key={group}
                type="button"
                className={classNames(
                  selectedGroup === group
                    ? '!bg-active text-primary-foreground'
                    : 'bg-background text-primary',
                )}
                onClick={() => {
                  setSelectedGroup(group);
                }}>
                {group}
              </button>
            ))}
          </HeaderRow>
        </div>
      )}
      <div className="w-[60%] md:w-auto pl-0.5 md:pl-0">
        <HeaderRow label={selectedRoomName}>
          {rooms.map((room) => (
            <button
              key={room.key}
              type="button"
              className={classNames(
                room.key === roomKey
                  ? '!bg-active text-primary-foreground'
                  : 'bg-background text-primary',
              )}
              onClick={() => {
                setRoomKey(room.key);
              }}>
              {room.title}
            </button>
          ))}
        </HeaderRow>
      </div>
    </div>
  );
};
