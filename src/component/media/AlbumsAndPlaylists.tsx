import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, type Selection } from '@nextui-org/react';
import { type MediaItemType, type Playlist } from './types';
import { type SelectedMediaIds } from './MediaPlayer';
import { AlbumsTable } from './AlbumsTable';
import { PlaylistsTable } from './PlaylistsTable';
import {
  useGetAlbumsApi,
  type AlbumsByName,
  useGetPlaylistsApi,
} from './hooks';

interface AlbumsAndPlaylistsProps {
  onSelection: (params: SelectedMediaIds) => void;
  onAddToQueue: (params: SelectedMediaIds) => void;
}

export const AlbumsAndPlaylists: React.FC<AlbumsAndPlaylistsProps> = ({
  onSelection,
  onAddToQueue,
}) => {
  const [albumsByName, setAlbumsByName] = useState<AlbumsByName>({});
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedKey, setSelectedKey] = useState<Selection>();
  const [itemType, setItemType] = useState<MediaItemType>('playlist');
  const getAlbums = useGetAlbumsApi();
  const getPlaylists = useGetPlaylistsApi();

  useEffect(() => {
    getAlbums()
      .then(setAlbumsByName)
      .catch((err) => console.log(err));
    getPlaylists()
      .then(setPlaylists)
      .catch((err) => console.log(err));
  }, []);

  const topContent = (
    <div className="flex flex-col">
      <ButtonGroup size="lg">
        <Button
          onClick={() => setItemType('album')}
          color={itemType === 'album' ? 'primary' : 'default'}>
          Albums
        </Button>
        <Button
          onClick={() => setItemType('playlist')}
          color={itemType === 'playlist' ? 'primary' : 'default'}>
          Playlists
        </Button>
      </ButtonGroup>
    </div>
  );

  return itemType === 'album' ? (
    <AlbumsTable
      selectedKey={selectedKey}
      setSelectedKey={setSelectedKey}
      albumsByName={albumsByName}
      onSelection={onSelection}
      onAddToQueue={onAddToQueue}
      topContent={topContent}
    />
  ) : (
    <PlaylistsTable
      selectedKey={selectedKey}
      setSelectedKey={setSelectedKey}
      playlists={playlists}
      onSelection={onSelection}
      onAddToQueue={onAddToQueue}
      topContent={topContent}
    />
  );
};
