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

    // if current page doesn't exist in new room than set first tab of new config
    // if (!newConfig.pages[activePage]) {
    // }
    // always select first tab in case of multiple rooms
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
      <HeaderRow className={className}>
        {groups.length > 0 &&
          groups.map((group) => {
            return (
              <button
                key={group}
                type="button"
                className={classNames(
                  'border border-neutral-400 bg-secondary px-3 py-3 flex items-center rounded-lg text-2xl',
                  group === selectedGroup
                    ? '!bg-active text-primary-foreground'
                    : 'bg-background text-primary',
                )}
                onClick={() => {
                  setSelectedGroup(group);
                }}>
                {group}
              </button>
            );
          })}
      </HeaderRow>
      <HeaderRow className={className}>
        {rooms.map((room) => {
          return (
            <button
              key={room.key}
              type="button"
              className={classNames(
                'border border-neutral-400 bg-secondary px-3 py-3 flex items-center rounded-lg text-2xl',
                room.key === roomKey
                  ? '!bg-active text-primary-foreground'
                  : 'bg-background text-primary',
              )}
              onClick={() => {
                setRoomKey(room.key);
              }}>
              {room.title}
            </button>
          );
        })}
      </HeaderRow>
    </>
  );
};
