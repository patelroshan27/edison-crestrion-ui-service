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
import { TablePagination } from './TablePagination';
import {
  useClearPlayerTracksApi,
  useGetPlayerTracksApi,
  useTablePagination,
} from './hooks';

interface PlayerTracksTableProps {
  playerId: string;
  tracks: Track[];
  topContent: ReactNode;
}
const playerTracksColumns = [
  { name: 'Track Name', uid: 'trackName' },
  { name: 'Duration', uid: 'trackDuration' },
];

export const PlayerTracksTable: React.FC<PlayerTracksTableProps> = ({
  playerId,
  tracks,
  topContent,
}) => {
  const clearPlayer = useClearPlayerTracksApi();
  const getPlayerTracks = useGetPlayerTracksApi();
  const { page, pages, setPage, filteredItems } = useTablePagination(tracks);

  const onClear = (): void => {
    clearPlayer({ playerId })
      .then(() => getPlayerTracks({ playerId }))
      .catch((err) => console.log(err));
  };

  const bottomContent = (
    <TablePagination pages={pages} page={page} setPage={setPage}>
      <Button className="ml-10" onClick={onClear}>
        Clear Player
      </Button>
    </TablePagination>
  );

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
      bottomContent={bottomContent}>
      <TableHeader columns={playerTracksColumns}>
        {(column) => <TableColumn key={column.uid}>{column.name}</TableColumn>}
      </TableHeader>
      <TableBody emptyContent={`No player tracks found`} items={filteredItems}>
        {(item) => (
          <TableRow key={item.trackId}>
            {(columnKey) => (
              <TableCell>{item[columnKey as keyof typeof item]}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
