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
import { type SelectedMediaIds } from './MediaPlayer';
import { PlusIcon } from 'lucide-react';
import { TablePagination } from './TablePagination';
import { type AlbumView, useTablePagination } from './hooks';

interface AlbumsTableProps {
  tableProps: Partial<TableProps>;
  albumsList: AlbumView[];
  topContent: ReactNode;
  selectedKey?: Selection;
  rowsPerPage?: number;
  setSelectedKey: (key: Selection) => void;
  onSelection: (params: SelectedMediaIds) => void;
  onAddToQueue: (params: SelectedMediaIds) => void;
}

const albumColumns = [
  { name: 'Album Name', uid: 'albumName' },
  { name: 'Add to Queue', uid: 'add' },
];

export const AlbumsTable: React.FC<AlbumsTableProps> = ({
  tableProps,
  albumsList,
  topContent,
  selectedKey,
  setSelectedKey,
  onAddToQueue,
  onSelection,
  rowsPerPage,
}) => {
  const { page, pages, setPage, filteredItems } = useTablePagination(
    albumsList,
    rowsPerPage ?? 7,
  );

  const renderAlbumCell = (
    album: AlbumView,
    key: string | number,
  ): ReactNode => {
    switch (key) {
      case 'albumName':
        return album[key];
      case 'add':
        return (
          <Button
            className="border border-neutral-400 bg-secondary"
            isIconOnly
            onClick={() => onAddToQueue({ albumIds: album.albumIds })}>
            <PlusIcon size={30} />
          </Button>
        );
    }
  };

  return (
    <Table
      className="rounded-2xl border border-neutral-400"
      {...tableProps}
      aria-label="Media Player Albums"
      defaultSelectedKeys={selectedKey}
      onSelectionChange={setSelectedKey}
      topContent={topContent}
      bottomContent={
        <TablePagination pages={pages} page={page} setPage={setPage} />
      }>
      <TableHeader columns={albumColumns}>
        {(column) => <TableColumn key={column.uid}>{column.name}</TableColumn>}
      </TableHeader>
      <TableBody emptyContent={`No albums found`}>
        {filteredItems.map((album) => (
          <TableRow
            key={album.albumIds.join()}
            className="border-b-1 border-neutral-700">
            {(columnKey) => (
              <TableCell
                onClick={() => onSelection({ albumIds: album.albumIds })}>
                {renderAlbumCell(album, columnKey)}
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
