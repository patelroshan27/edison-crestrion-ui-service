import React, { useCallback, useEffect, useState } from 'react';
import {
  type PlayerStatus,
  type PlayerTrack,
  type Playlist,
  type Track,
} from './types';
import { AlbumsAndPlaylists } from './AlbumsAndPlaylists';
import { TracksAndQueue } from './TracksAndQueue';
import { PlayerControls } from './PlayerControls';
import {
  type AlbumsByName,
  useAddToPlayerApi,
  useGetAlbumsApi,
  useGetPlayerTracksApi,
  useGetPlaylistsApi,
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
  const [playerStatus, setPlayerStatus] = useState<PlayerStatus>();
  const [albumsByName, setAlbumsByName] = useState<AlbumsByName>({});
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [playerTracks, setPlayerTracks] = useState<PlayerTrack[]>([]);
  const [selectedIds, setSelectedIds] = useState<SelectedMediaIds>();
  const getPlayerStatus = useGetPlayerStatusApi();
  const getAlbums = useGetAlbumsApi();
  const getPlaylists = useGetPlaylistsApi();
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
      .then((res) => setPlayerStatus(res.playerStatus))
      .catch((err) => console.log(err));
  }, [playerId, getPlayerStatus]);

  useEffect(() => {
    getAlbums()
      .then(setAlbumsByName)
      .catch((err) => console.log(err));
    getPlaylists()
      .then(setPlaylists)
      .catch((err) => console.log(err));
    updatePlayerStatus();
    updatePlayerTracks();
  }, []);

  useEffect(() => {
    if (selectedIds) {
      getTracksById(selectedIds)
        .then(setTracks)
        .catch((err) => console.log(err));
    }
  }, [selectedIds]);

  const onAddToQueue = useCallback(
    (idsToAdd: SelectedMediaIds): void => {
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
    <div className="flex gap-2">
      <AlbumsAndPlaylists
        albumsByName={albumsByName}
        playlists={playlists}
        onSelection={setSelectedIds}
        onAddToQueue={onAddToQueue}
      />
      <div className="flex flex-col w-full gap-2">
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
          onAddToQueue={onAddToQueue}
          onPlayerTracksChange={onPlayerTracksChange}
          updatePlayerStatus={updatePlayerStatus}
        />
      </div>
    </div>
  );
};
