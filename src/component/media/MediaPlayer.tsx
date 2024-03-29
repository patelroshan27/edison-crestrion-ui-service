import React, { useCallback, useEffect, useState } from 'react';
import {
  type MediaItemType,
  type PlayerStatus,
  type PlayerTrack,
  type Track,
} from './types';
import { AlbumsAndPlaylists } from './AlbumsAndPlaylists';
import { TracksAndQueue } from './TracksAndQueue';
import { PlayerControls } from './PlayerControls';
import {
  useAddToPlayerApi,
  useGetPlayerTracksApi,
  useGetTracksByIdApi,
  useGetPlayerStatusApi,
} from './hooks';

export interface SelectedMediaIds {
  playlistIds?: string[];
  trackIds?: string[];
  albumIds?: string[];
}

interface MediaPlayerProps {
  playerId: string;
}

function withIndex(tracks: Track[]): PlayerTrack[] {
  return tracks.map((t, index) => ({ index, ...t }));
}

export const MediaPlayer: React.FC<MediaPlayerProps> = ({ playerId }) => {
  const [tracksView, setTracksView] = useState<MediaItemType>('track');
  const [playerStatus, setPlayerStatus] = useState<PlayerStatus>();
  const [tracks, setTracks] = useState<Track[]>([]);
  const [playerTracks, setPlayerTracks] = useState<PlayerTrack[]>([]);
  const [selectedIds, setSelectedIds] = useState<SelectedMediaIds>();
  const getPlayerStatus = useGetPlayerStatusApi();
  const getTracksById = useGetTracksByIdApi();
  const getPlayerTracks = useGetPlayerTracksApi();
  const addToPlayer = useAddToPlayerApi();

  const updatePlayerTracks = useCallback((): void => {
    getPlayerTracks({ playerId })
      .then(withIndex)
      .then(setPlayerTracks)
      .catch((err) => console.log(err));
  }, [playerId, getPlayerTracks]);

  const updatePlayerStatus = useCallback((): void => {
    getPlayerStatus({ playerId })
      .then((res) => setPlayerStatus(res))
      .catch((err) => console.log(err));
  }, [playerId, getPlayerStatus]);

  useEffect(() => {
    updatePlayerStatus();
    updatePlayerTracks();
  }, []);

  useEffect(() => {
    if (selectedIds) {
      if (tracksView !== 'track') setTracksView('track');
      getTracksById(selectedIds)
        .then(setTracks)
        .catch((err) => console.log(err));
    }
  }, [selectedIds]);

  const onAddToQueue = useCallback(
    (idsToAdd: SelectedMediaIds): void => {
      if (tracksView !== 'playerTrack' && !idsToAdd.trackIds?.length)
        setTracksView('playerTrack');
      addToPlayer({ playerId, ...idsToAdd })
        .then(updatePlayerTracks)
        .catch((e) => console.log(e));
    },
    [playerId, addToPlayer, getPlayerTracks],
  );

  const onPlayerTracksChange = useCallback((): void => {
    updatePlayerTracks();
  }, [updatePlayerTracks]);

  return (
    <div className="flex h-[98%] bg-backround">
      <AlbumsAndPlaylists
        onSelection={setSelectedIds}
        onAddToQueue={onAddToQueue}
      />
      <div className="flex flex-col w-full bg-backround ml-2">
        <PlayerControls
          playerId={playerId}
          playerStatus={playerStatus}
          updatePlayerStatus={updatePlayerStatus}
        />
        <TracksAndQueue
          playerId={playerId}
          tracks={tracks}
          playerTracks={playerTracks}
          playerStatus={playerStatus}
          tracksView={tracksView}
          onAddToQueue={onAddToQueue}
          onPlayerTracksChange={onPlayerTracksChange}
          updatePlayerStatus={updatePlayerStatus}
          setTracksView={setTracksView}
        />
      </div>
    </div>
  );
};
