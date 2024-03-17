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
import { type Album } from './types';
import { type SelectedMediaIds } from './MediaPlayer';
import { PlusIcon } from 'lucide-react';
import { TablePagination } from './TablePagination';
import { useTablePagination } from './hooks';

interface AlbumsTableProps {
  albums: Album[];
  topContent: ReactNode;
  onSelection: (params: SelectedMediaIds) => void;
  onAddToQueue: (params: SelectedMediaIds) => void;
}

const albumColumns = [
  { name: 'Album Name', uid: 'albumName' },
  { name: 'Add', uid: 'add' },
];

export const AlbumsTable: React.FC<AlbumsTableProps> = ({
  albums,
  topContent,
  onAddToQueue,
  onSelection,
}) => {
  const { page, pages, setPage, filteredItems } = useTablePagination(albums);

  const renderAlbumCell = (album: Album, key: string | number): ReactNode => {
    switch (key) {
      case 'albumName':
        return album[key];
      case 'add':
        return (
          <Button
            isIconOnly
            onClick={() => onAddToQueue({ albumIds: [album.albumId] })}>
            <PlusIcon />
          </Button>
        );
    }
  };

  return (
    <Table
      aria-label="Media Player Albums/Playlists"
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
      <TableHeader columns={albumColumns}>
        {(column) => <TableColumn key={column.uid}>{column.name}</TableColumn>}
      </TableHeader>
      <TableBody emptyContent={`No albums found`} items={filteredItems}>
        {(item) => (
          <TableRow key={item.albumId}>
            {(columnKey) => (
              <TableCell
                onClick={() => onSelection({ albumIds: [item.albumId] })}>
                {renderAlbumCell(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
