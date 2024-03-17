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
import { type Track } from './types';
import { type SelectedMediaIds } from './MediaPlayer';
import { PlusIcon } from 'lucide-react';
import { TablePagination } from './TablePagination';
import { useTablePagination } from './hooks';

interface TracksTableProps {
  tracks: Track[];
  topContent: ReactNode;
  onAddToQueue: (params: SelectedMediaIds) => void;
}

const tracksColumns = [
  { name: 'Track Name', uid: 'trackName' },
  { name: 'Duration', uid: 'trackDuration' },
  { name: 'Add', uid: 'add' },
];

export const TracksTable: React.FC<TracksTableProps> = ({
  tracks,
  topContent,
  onAddToQueue,
}) => {
  const { page, pages, setPage, filteredItems } = useTablePagination(tracks, 6);

  const renderCell = (track: Track, key: string | number): ReactNode => {
    switch (key) {
      case 'trackName':
      case 'trackDuration':
        return track[key];
      case 'add':
        return (
          <Button
            isIconOnly
            onClick={() => onAddToQueue({ trackIds: [track.trackId] })}>
            <PlusIcon />
          </Button>
        );
    }
  };

  return (
    <Table
      aria-label="Media Player Tracks List"
      isHeaderSticky
      isStriped
      classNames={{
        base: 'flex-grow-[1]',
        wrapper: 'h-full justify-start',
      }}
      topContent={topContent}
      bottomContent={
        <TablePagination pages={pages} page={page} setPage={setPage} />
      }>
      <TableHeader columns={tracksColumns}>
        {(column) => <TableColumn key={column.uid}>{column.name}</TableColumn>}
      </TableHeader>
      <TableBody emptyContent={`No tracks found`} items={filteredItems}>
        {(item) => (
          <TableRow key={item.trackId}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
