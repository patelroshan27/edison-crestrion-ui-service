import React from 'react';
import { Button, ButtonGroup, type TableProps } from '@nextui-org/react';
import {
  type PlayerTrack,
  type MediaItemType,
  type Track,
  type PlayerStatus,
} from './types';
import { TracksTable } from './TracksTable';
import { PlayerTracksTable } from './PlayerTracksTable';
import { type SelectedMediaIds } from './MediaPlayer';

const tableProps: Partial<TableProps> = {
  hideHeader: true,
  layout: 'fixed',
  classNames: {
    base: 'flex-grow-[1]',
    wrapper: 'h-full justify-between gap-0',
    td: 'text-2xl first:truncate first:w-[65%]',
  },
};

interface TracksAndQueueProps {
  playerId: string;
  tracks: Track[];
  playerTracks: PlayerTrack[];
  playerStatus?: PlayerStatus;
  tracksView: MediaItemType;
  onAddToQueue: (params: SelectedMediaIds) => void;
  onPlayerTracksChange: () => void;
  updatePlayerStatus: () => void;
  setTracksView: (item: MediaItemType) => void;
}

export const TracksAndQueue: React.FC<TracksAndQueueProps> = ({
  playerId,
  tracks,
  playerTracks,
  playerStatus,
  tracksView,
  onAddToQueue,
  onPlayerTracksChange,
  updatePlayerStatus,
  setTracksView,
}) => {
  const topContent = (
    <div className="flex flex-col">
      <ButtonGroup size="lg">
        <Button
          className="text-2xl"
          onClick={() => setTracksView('track')}
          color={tracksView === 'track' ? 'primary' : 'default'}>
          Tracks ({tracks.length})
        </Button>
        <Button
          className="text-2xl"
          onClick={() => setTracksView('playerTrack')}
          color={tracksView === 'playerTrack' ? 'primary' : 'default'}>
          Player Queue ({playerTracks.length})
        </Button>
      </ButtonGroup>
    </div>
  );

  return tracksView === 'track' ? (
    <TracksTable
      tableProps={tableProps}
      tracks={tracks}
      topContent={topContent}
      onAddToQueue={onAddToQueue}
    />
  ) : (
    <PlayerTracksTable
      tableProps={tableProps}
      playerId={playerId}
      tracks={playerTracks}
      topContent={topContent}
      playerStatus={playerStatus}
      onPlayerTracksChange={onPlayerTracksChange}
      updatePlayerStatus={updatePlayerStatus}
    />
  );
};
