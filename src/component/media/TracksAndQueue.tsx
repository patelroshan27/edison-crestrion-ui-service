import React from 'react';
import { Button, ButtonGroup } from '@nextui-org/react';
import {
  type PlayerTrack,
  type MediaItemType,
  type Track,
  type PlayerStatus,
} from './types';
import { TracksTable } from './TracksTable';
import { PlayerTracksTable } from './PlayerTracksTable';
import { type SelectedMediaIds } from './MediaPlayer';

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
          onClick={() => setTracksView('track')}
          color={tracksView === 'track' ? 'primary' : 'default'}>
          Tracks
        </Button>
        <Button
          onClick={() => setTracksView('playerTrack')}
          color={tracksView === 'playerTrack' ? 'primary' : 'default'}>
          Player Queue ({playerTracks.length})
        </Button>
      </ButtonGroup>
    </div>
  );

  return tracksView === 'track' ? (
    <TracksTable
      tracks={tracks}
      topContent={topContent}
      onAddToQueue={onAddToQueue}
    />
  ) : (
    <PlayerTracksTable
      playerId={playerId}
      tracks={playerTracks}
      topContent={topContent}
      playerStatus={playerStatus}
      onPlayerTracksChange={onPlayerTracksChange}
      updatePlayerStatus={updatePlayerStatus}
    />
  );
};
