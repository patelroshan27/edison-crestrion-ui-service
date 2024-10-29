import React, { useState } from 'react';
import {
  Button,
  ButtonGroup,
  type TableProps,
  type Selection,
} from '@nextui-org/react';
import { type MediaItemType } from './types';
import { type SelectedMediaIds } from './MediaPlayer';
import { AlbumsTable } from './AlbumsTable';
import { PlaylistsTable } from './PlaylistsTable';
import { useAlbumsAndPlaylists } from './hooks';
import classNames from 'classnames';

interface AlbumsAndPlaylistsProps {
  onSelection: (params: SelectedMediaIds) => void;
  onAddToQueue: (params: SelectedMediaIds) => void;
  rowsPerPage?: number;
}

const tableProps: Partial<TableProps> = {
  layout: 'fixed',
  hideHeader: true,
  color: 'primary',
  selectionMode: 'single',
  classNames: {
    base: 'inline-flex w-2/5',
    wrapper: 'bg-background  justify-between h-full gap-0',
    td: 'text-2xl text-primary !truncate first:w-[75%]',
  },
};

export const AlbumsAndPlaylists: React.FC<AlbumsAndPlaylistsProps> = ({
  onSelection,
  onAddToQueue,
  rowsPerPage,
}) => {
  const [selectedKey, setSelectedKey] = useState<Selection>();
  const [itemType, setItemType] = useState<MediaItemType>('playlist');
  const { albumsList, playlists } = useAlbumsAndPlaylists();

  const topContent = (
    <div className="flex flex-col">
      <ButtonGroup size="lg">
        <Button
          className={classNames(
            'text-2xl border border-neutral-400  rounded-l-lg',
            itemType === 'album'
              ? '!bg-active text-primary-foreground'
              : 'bg-secondary text-primary',
          )}
          onClick={() => setItemType('album')}
          color={itemType === 'album' ? 'primary' : 'default'}>
          Albums
        </Button>
        <Button
          className={classNames(
            'text-2xl border border-neutral-400 rounded-r-lg',
            itemType === 'playlist'
              ? '!bg-active text-primary-foreground'
              : 'bg-secondary text-primary',
          )}
          onClick={() => setItemType('playlist')}
          color={itemType === 'playlist' ? 'primary' : 'default'}>
          Playlists
        </Button>
      </ButtonGroup>
    </div>
  );

  return itemType === 'album' ? (
    <AlbumsTable
      tableProps={tableProps}
      selectedKey={selectedKey}
      setSelectedKey={setSelectedKey}
      albumsList={albumsList}
      onSelection={onSelection}
      onAddToQueue={onAddToQueue}
      topContent={topContent}
      rowsPerPage={rowsPerPage}
    />
  ) : (
    <PlaylistsTable
      tableProps={tableProps}
      selectedKey={selectedKey}
      setSelectedKey={setSelectedKey}
      playlists={playlists}
      onSelection={onSelection}
      onAddToQueue={onAddToQueue}
      topContent={topContent}
      rowsPerPage={rowsPerPage}
    />
  );
};
