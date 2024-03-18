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
import { type PlayerTrack, type Track } from './types';
import { TablePagination } from './TablePagination';
import {
  useClearPlayerTracksApi,
  useDeletePlayerTracksApi,
  usePlayerPlayTrackApi,
  useTablePagination,
} from './hooks';
import { PlayIcon, TrashIcon } from 'lucide-react';
import { formatSecondsToMinutes } from './utils';

interface PlayerTracksTableProps {
  playerId: string;
  tracks: PlayerTrack[];
  topContent: ReactNode;
  onPlayerTracksChange: () => void;
}
const playerTracksColumns = [
  { name: 'Track Name', uid: 'trackName' },
  { name: 'Duration', uid: 'trackDuration' },
  { name: 'Play', uid: 'play' },
  { name: 'Remove from Queue', uid: 'remove' },
];

export const PlayerTracksTable: React.FC<PlayerTracksTableProps> = ({
  playerId,
  tracks,
  topContent,
  onPlayerTracksChange,
}) => {
  const playTrack = usePlayerPlayTrackApi();
  const clearPlayer = useClearPlayerTracksApi();
  const deletePlayerTracks = useDeletePlayerTracksApi();
  const { page, pages, setPage, filteredItems } = useTablePagination(tracks);

  const onClear = (): void => {
    clearPlayer({ playerId })
      .then(onPlayerTracksChange)
      .catch((err) => console.log(err));
  };

  const onPlay = (track: Track): void => {
    playTrack({ playerId, trackId: track.trackId, trackStartTime: 0 }).catch(
      (err) => console.log(err),
    );
  };

  const onRemove = (index: number): void => {
    deletePlayerTracks({ playerId, trackIndexes: [`${index}`] })
      .then(onPlayerTracksChange)
      .catch((err) => console.log(err));
  };

  const renderCell = (track: PlayerTrack, key: string | number): ReactNode => {
    switch (key) {
      case 'trackName':
        return track[key];
      case 'trackDuration':
        return formatSecondsToMinutes(track[key]);
      case 'play':
        return (
          <Button isIconOnly onClick={() => onPlay(track)}>
            <PlayIcon />
          </Button>
        );
      case 'remove':
        return (
          <Button isIconOnly onClick={() => onRemove(track.index)}>
            <TrashIcon />
          </Button>
        );
    }
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
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
