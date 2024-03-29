import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  type TableProps,
  TableRow,
} from '@nextui-org/react';
import React, { type ReactNode } from 'react';
import { type Track } from './types';
import { type SelectedMediaIds } from './MediaPlayer';
import { PlusIcon } from 'lucide-react';
import { TablePagination } from './TablePagination';
import { useTablePagination } from './hooks';
import { formatSecondsToMinutes } from './utils';

interface TracksTableProps {
  tableProps: Partial<TableProps>;
  tracks: Track[];
  topContent: ReactNode;
  onAddToQueue: (params: SelectedMediaIds) => void;
}

const tracksColumns = [
  { name: 'Track Name', uid: 'trackName' },
  { name: 'Duration', uid: 'trackDuration' },
  { name: 'Add to Queue', uid: 'add' },
];

export const TracksTable: React.FC<TracksTableProps> = ({
  tableProps,
  tracks,
  topContent,
  onAddToQueue,
}) => {
  const { page, pages, setPage, filteredItems } = useTablePagination(tracks);

  const renderCell = (track: Track, key: string | number): ReactNode => {
    switch (key) {
      case 'trackName':
        return track[key];
      case 'trackDuration':
        return formatSecondsToMinutes(track[key]);
      case 'add':
        return (
          <Button
            className="border border-neutral-400 bg-secondary"
            isIconOnly
            onClick={() => onAddToQueue({ trackIds: [track.trackId] })}>
            <PlusIcon size={30} />
          </Button>
        );
    }
  };

  return (
    <Table
      className="border border-neutral-400 rounded-2xl"
      {...tableProps}
      aria-label="Media Player Tracks List"
      topContent={topContent}
      bottomContent={
        <TablePagination pages={pages} page={page} setPage={setPage} />
      }>
      <TableHeader columns={tracksColumns}>
        {(column) => <TableColumn key={column.uid}>{column.name}</TableColumn>}
      </TableHeader>
      <TableBody emptyContent={`No tracks found`} items={filteredItems}>
        {(item) => (
          <TableRow
            key={item.trackId}
            className="border-b-1  border-neutral-700">
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
