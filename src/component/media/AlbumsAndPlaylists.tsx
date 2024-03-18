import React, { useState } from 'react';
import { Button, ButtonGroup, type Selection } from '@nextui-org/react';
import { type MediaItemType, type Playlist } from './types';
import { type SelectedMediaIds } from './MediaPlayer';
import { AlbumsTable } from './AlbumsTable';
import { PlaylistsTable } from './PlaylistsTable';
import { type AlbumsByName } from './hooks';

interface AlbumsAndPlaylistsProps {
  albumsByName: AlbumsByName;
  playlists: Playlist[];
  onSelection: (params: SelectedMediaIds) => void;
  onAddToQueue: (params: SelectedMediaIds) => void;
}

export const AlbumsAndPlaylists: React.FC<AlbumsAndPlaylistsProps> = ({
  albumsByName,
  playlists,
  onSelection,
  onAddToQueue,
}) => {
  const [selectedKey, setSelectedKey] = useState<Selection>();
  const [itemType, setItemType] = useState<MediaItemType>('playlist');

  const topContent = (
    <div className="flex flex-col">
      <ButtonGroup>
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
