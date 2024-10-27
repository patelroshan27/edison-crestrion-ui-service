import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  activeConfigState,
  loggedInUserState,
  pageState,
} from 'state/navigation';
import { type RoomKey, getConfigs } from 'config/Configs';
import { getAllowedPages } from 'utils/getAllowedPages';
import { HeaderRow } from './HeaderRow';

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

  return (
    <>
      <HeaderRow className={classNames('flex-wrap', className)}>
        {groups.length > 0 &&
          groups.map((group) => (
            <button
              key={group}
              type="button"
              className={classNames(
                'border border-neutral-400 bg-secondary px-2 sm:px-3 py-2 sm:py-3 flex items-center rounded-lg text-lg sm:text-xl md:text-2xl mb-2',
                group === selectedGroup
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
      <HeaderRow className={classNames('flex-wrap', className)}>
        {rooms.map((room) => (
          <button
            key={room.key}
            type="button"
            className={classNames(
              'border border-neutral-400 bg-secondary px-2 sm:px-3 py-2 sm:py-3 flex items-center rounded-lg text-lg sm:text-xl md:text-2xl mb-2',
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
    </>
  );
};
