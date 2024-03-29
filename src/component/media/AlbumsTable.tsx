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
import React, { useMemo, type ReactNode } from 'react';
import { type SelectedMediaIds } from './MediaPlayer';
import { PlusIcon } from 'lucide-react';
import { TablePagination } from './TablePagination';
import { type AlbumsByName, useTablePagination } from './hooks';

interface AlbumsTableProps {
  tableProps: Partial<TableProps>;
  albumsByName: AlbumsByName;
  topContent: ReactNode;
  selectedKey?: Selection;
  setSelectedKey: (key: Selection) => void;
  onSelection: (params: SelectedMediaIds) => void;
  onAddToQueue: (params: SelectedMediaIds) => void;
}
interface AlbumView {
  albumName: string;
  albumIds: string[];
}

const albumColumns = [
  { name: 'Album Name', uid: 'albumName' },
  { name: 'Add to Queue', uid: 'add' },
];

export const AlbumsTable: React.FC<AlbumsTableProps> = ({
  tableProps,
  albumsByName,
  topContent,
  selectedKey,
  setSelectedKey,
  onAddToQueue,
  onSelection,
}) => {
  const albumsList: AlbumView[] = useMemo(() => {
    return Object.keys(albumsByName).map((k) => ({
      albumName: albumsByName[k][0]?.albumName,
      albumIds: albumsByName[k].map((a) => a.albumId),
    }));
  }, [albumsByName]);
  const { page, pages, setPage, filteredItems } = useTablePagination(
    albumsList,
    8,
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
            isIconOnly
            onClick={() => onAddToQueue({ albumIds: album.albumIds })}>
            <PlusIcon size={30} />
          </Button>
        );
    }
  };

  return (
    <Table
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
      <TableBody emptyContent={`No albums found`} items={filteredItems}>
        {(album) => (
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
        )}
      </TableBody>
    </Table>
  );
};
