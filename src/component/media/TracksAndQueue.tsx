import React, { useState } from 'react';
import { Button, ButtonGroup } from '@nextui-org/react';
import { type PlayerTrack, type MediaItemType, type Track } from './types';
import { TracksTable } from './TracksTable';
import { PlayerTracksTable } from './PlayerTracksTable';
import { type SelectedMediaIds } from './MediaPlayer';

interface TracksAndQueueProps {
  playerId: string;
  tracks: Track[];
  playerTracks: PlayerTrack[];
  onAddToQueue: (params: SelectedMediaIds) => void;
  onPlayerTracksChange: () => void;
}

export const TracksAndQueue: React.FC<TracksAndQueueProps> = ({
  playerId,
  tracks,
  playerTracks,
  onAddToQueue,
  onPlayerTracksChange,
}) => {
  const [itemType, setItemType] = useState<MediaItemType>('track');

  const topContent = (
    <div className="flex flex-col">
      <ButtonGroup>
        <Button
          onClick={() => setItemType('track')}
          color={itemType === 'track' ? 'primary' : 'default'}>
          Tracks
        </Button>
        <Button
          onClick={() => setItemType('playerTrack')}
          color={itemType === 'playerTrack' ? 'primary' : 'default'}>
          Player Queue ({playerTracks.length})
        </Button>
      </ButtonGroup>
    </div>
  );

  return itemType === 'track' ? (
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
      onPlayerTracksChange={onPlayerTracksChange}
    />
  );
};
