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
import classNames from 'classnames';
import { onMediaPlayerAction } from './utils';
import { useClearPlayerTracksApi } from './hooks';

const tableProps: Partial<TableProps> = {
  hideHeader: true,
  layout: 'fixed',
  classNames: {
    base: 'flex-grow-[1]',
    wrapper: 'bg-background h-full justify-between gap-0',
    td: 'text-2xl text-primary first:truncate first:w-[65%]',
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
  const clearPlayer = useClearPlayerTracksApi();

  const onClear = (): void => {
    onMediaPlayerAction(clearPlayer({ playerId }), onPlayerTracksChange);
  };

  const topContent = (
    <div className="flex justify-center items-center">
      <ButtonGroup size="lg">
        <Button
          className={classNames(
            'text-2xl border border-neutral-400 mob:text-sm',
            tracksView === 'track'
              ? '!bg-active text-primary-foreground'
              : 'bg-secondary text-primary',
          )}
          onClick={() => setTracksView('track')}
          color={tracksView === 'track' ? 'primary' : 'default'}>
          Tracks ({tracks.length})
        </Button>
        <Button
          className={classNames(
            'text-2xl border border-neutral-400 rounded-r-lg mob:text-sm',
            tracksView === 'playerTrack'
              ? '!bg-active text-primary-foreground'
              : 'bg-secondary text-primary',
          )}
          onClick={() => setTracksView('playerTrack')}
          color={tracksView === 'playerTrack' ? 'primary' : 'default'}>
          Queue ({playerTracks.length})
        </Button>
      </ButtonGroup>
      <Button
        className="text-2xl border border-neutral-400 rounded-lg ml-10 bg-secondary text-primary mob:text-sm"
        onClick={onClear}
        size="lg">
        Clear Queue
      </Button>
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
