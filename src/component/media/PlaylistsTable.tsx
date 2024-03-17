import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import React, { type ReactNode } from 'react';
import { type Playlist } from './types';
import { type SelectedMediaIds } from './MediaPlayer';
import { PlusIcon } from 'lucide-react';
import { useTablePagination } from './hooks';
import { TablePagination } from './TablePagination';

interface PlaylistsTableProps {
  playlists: Playlist[];
  topContent: ReactNode;
  onSelection: (params: SelectedMediaIds) => void;
  onAddToQueue: (params: SelectedMediaIds) => void;
}

const playlistColumns = [
  { name: 'Playlist Name', uid: 'playlistName' },
  { name: 'Add', uid: 'add' },
];

export const PlaylistsTable: React.FC<PlaylistsTableProps> = ({
  playlists,
  topContent,
  onAddToQueue,
  onSelection,
}) => {
  const { page, pages, setPage, filteredItems } = useTablePagination(playlists);

  const renderPlaylistCell = (
    playlist: Playlist,
    key: string | number,
  ): ReactNode => {
    switch (key) {
      case 'playlistName':
        return playlist[key];
      case 'add':
        return (
          <Button
            isIconOnly
            onClick={() =>
              onAddToQueue({ playlistIds: [playlist.playlistId] })
            }>
            <PlusIcon />
          </Button>
        );
    }
  };

  return (
    <Table
      aria-label="Media Player Playlists"
      isHeaderSticky
      isStriped
      classNames={{
        base: 'inline-flex w-1/2',
        wrapper: 'justify-start',
      }}
      topContent={topContent}
      bottomContent={
        <TablePagination pages={pages} page={page} setPage={setPage} />
      }>
      <TableHeader columns={playlistColumns}>
        {(column) => <TableColumn key={column.uid}>{column.name}</TableColumn>}
      </TableHeader>
      <TableBody emptyContent={`No playlists found`} items={filteredItems}>
        {(item) => (
          <TableRow key={item.playlistId}>
            {(columnKey) => (
              <TableCell
                onClick={() => onSelection({ playlistIds: [item.playlistId] })}>
                {renderPlaylistCell(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
