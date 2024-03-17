import React, { useCallback, useEffect, useState } from 'react';
import { type Album, type Playlist, type Track } from './types';
import { AlbumsAndPlaylists } from './AlbumsAndPlaylists';
import { TracksAndQueue } from './TracksAndQueue';
import { PlayerControls } from './PlayerControls';
import {
  useAddToPlayerApi,
  useGetAlbumsApi,
  useGetPlayerTracksApi,
  useGetPlaylistsApi,
  useGetTracksByIdApi,
} from './hooks';

export interface SelectedMediaIds {
  playlistIds?: string[];
  trackIds?: string[];
  albumIds?: string[];
}

interface MediaPlayerProps {
  playerId: string;
}

export const MediaPlayer: React.FC<MediaPlayerProps> = ({ playerId }) => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [playerTracks, setPlayerTracks] = useState<Track[]>([]);
  const [selectedIds, setSelectedIds] = useState<SelectedMediaIds>();
  const getAlbums = useGetAlbumsApi();
  const getPlaylists = useGetPlaylistsApi();
  const getTracksById = useGetTracksByIdApi();
  const getPlayerTracks = useGetPlayerTracksApi();
  const addToPlayer = useAddToPlayerApi();

  useEffect(() => {
    getAlbums()
      .then(setAlbums)
      .catch((err) => console.log(err));
    getPlaylists()
      .then(setPlaylists)
      .catch((err) => console.log(err));
    getPlayerTracks({ playerId })
      .then(setPlayerTracks)
      .catch((err) => console.log(err));
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
        .then(() => getPlayerTracks({ playerId }))
        .then(setPlayerTracks)
        .catch((e) => console.log(e));
    },
    [playerId, addToPlayer, getPlayerTracks],
  );

  return (
    <div className="flex gap-2">
      <AlbumsAndPlaylists
        albums={albums}
        playlists={playlists}
        onSelection={setSelectedIds}
        onAddToQueue={onAddToQueue}
      />
      <div className="flex flex-col w-full gap-2">
        <PlayerControls />
        <TracksAndQueue
          playerId={playerId}
          tracks={tracks}
          playerTracks={playerTracks}
          onAddToQueue={onAddToQueue}
        />
      </div>
    </div>
  );
};
