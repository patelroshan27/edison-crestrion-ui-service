import React, { useState } from 'react';
import { Button, ButtonGroup } from '@nextui-org/react';
import { type Album, type MediaItemType, type Playlist } from './types';
import { type SelectedMediaIds } from './MediaPlayer';
import { AlbumsTable } from './AlbumsTable';
import { PlaylistsTable } from './PlaylistsTable';

interface AlbumsAndPlaylistsProps {
  albums: Album[];
  playlists: Playlist[];
  onSelection: (params: SelectedMediaIds) => void;
  onAddToQueue: (params: SelectedMediaIds) => void;
}

export const AlbumsAndPlaylists: React.FC<AlbumsAndPlaylistsProps> = ({
  albums,
  playlists,
  onSelection,
  onAddToQueue,
}) => {
  const [itemType, setItemType] = useState<MediaItemType>('album');

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
      albums={albums}
      onSelection={onSelection}
      onAddToQueue={onAddToQueue}
      topContent={topContent}
    />
  ) : (
    <PlaylistsTable
      playlists={playlists}
      onSelection={onSelection}
      onAddToQueue={onAddToQueue}
      topContent={topContent}
    />
  );
};
