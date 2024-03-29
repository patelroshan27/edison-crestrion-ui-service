import {
  Button,
  type Selection,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  type TableProps,
} from '@nextui-org/react';
import React, { type ReactNode } from 'react';
import { type Playlist } from './types';
import { type SelectedMediaIds } from './MediaPlayer';
import { PlusIcon } from 'lucide-react';
import { useTablePagination } from './hooks';
import { TablePagination } from './TablePagination';

interface PlaylistsTableProps {
  tableProps: Partial<TableProps>;
  playlists: Playlist[];
  topContent: ReactNode;
  selectedKey?: Selection;
  setSelectedKey: (key: Selection) => void;
  onSelection: (params: SelectedMediaIds) => void;
  onAddToQueue: (params: SelectedMediaIds) => void;
}

const playlistColumns = [
  { name: 'Playlist Name', uid: 'playlistName' },
  { name: 'Add to Queue', uid: 'add' },
];

export const PlaylistsTable: React.FC<PlaylistsTableProps> = ({
  tableProps,
  playlists,
  topContent,
  selectedKey,
  setSelectedKey,
  onAddToQueue,
  onSelection,
}) => {
  const { page, pages, setPage, filteredItems } = useTablePagination(
    playlists,
    8,
  );

  const renderPlaylistCell = (
    playlist: Playlist,
    key: string | number,
  ): ReactNode => {
    switch (key) {
      case 'playlistName':
        return playlist[key];
      case 'add':
        return (
          <Button className='bg-primary-foreground'
            isIconOnly
            onClick={() =>
              onAddToQueue({ playlistIds: [playlist.playlistId] })
            }>
            <PlusIcon size={30} />
          </Button>
        );
    }
  };

  return (
    <Table
      {...tableProps}
      aria-label="Media Player Playlists"
      defaultSelectedKeys={selectedKey}
      onSelectionChange={setSelectedKey}
      topContent={topContent}
      bottomContent={
        <TablePagination pages={pages} page={page} setPage={setPage} />
      }>
      <TableHeader columns={playlistColumns}>
        {(column) => <TableColumn key={column.uid}>{column.name}</TableColumn>}
      </TableHeader>
      <TableBody emptyContent={`No playlists found`} items={filteredItems}>
        {(item) => (
          <TableRow
            key={item.playlistId}
            className="border-b-1 border-neutral-700">
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
