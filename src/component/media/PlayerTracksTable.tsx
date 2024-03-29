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
import { type PlayerStatus, type PlayerTrack, type Track } from './types';
import { TablePagination } from './TablePagination';
import {
  useClearPlayerTracksApi,
  useDeletePlayerTracksApi,
  usePlayerPlayTrackApi,
  useTablePagination,
} from './hooks';
import { PlayIcon, TrashIcon } from 'lucide-react';
import { formatSecondsToMinutes, onMediaPlayerAction } from './utils';

interface PlayerTracksTableProps {
  tableProps: Partial<TableProps>;
  playerId: string;
  tracks: PlayerTrack[];
  topContent: ReactNode;
  playerStatus?: PlayerStatus;
  onPlayerTracksChange: () => void;
  updatePlayerStatus: () => void;
}
const playerTracksColumns = [
  { name: 'Track Name', uid: 'trackName' },
  { name: 'Duration', uid: 'trackDuration' },
  { name: 'Play', uid: 'play' },
  { name: 'Remove from Queue', uid: 'remove' },
];

export const PlayerTracksTable: React.FC<PlayerTracksTableProps> = ({
  tableProps,
  playerId,
  tracks,
  topContent,
  playerStatus,
  onPlayerTracksChange,
  updatePlayerStatus,
}) => {
  const playTrack = usePlayerPlayTrackApi();
  const clearPlayer = useClearPlayerTracksApi();
  const deletePlayerTracks = useDeletePlayerTracksApi();
  const { page, pages, setPage, filteredItems } = useTablePagination(tracks);

  const onClear = (): void => {
    onMediaPlayerAction(clearPlayer({ playerId }), onPlayerTracksChange);
  };

  const onPlay = (track: Track): void => {
    onMediaPlayerAction(
      playTrack({ playerId, trackId: track.trackId, trackStartTime: 0 }),
      updatePlayerStatus,
    );
  };

  const onRemove = (index: number): void => {
    onMediaPlayerAction(
      deletePlayerTracks({ playerId, trackIndexes: [`${index}`] }),
      onPlayerTracksChange,
    );
  };

  const renderCell = (track: PlayerTrack, key: string | number): ReactNode => {
    switch (key) {
      case 'trackName':
        return track[key];
      case 'trackDuration':
        return formatSecondsToMinutes(track[key]);
      case 'play': {
        const isPlaying =
          playerStatus?.playerTrackIndex === track.index.toString();
        const color = isPlaying ? 'primary' : 'default';
        return (
          <Button className='bg-primary-foreground' isIconOnly onClick={() => onPlay(track)} color={color}>
            <PlayIcon size={30} />
          </Button>
        );
      }
      case 'remove':
        return (
          <Button className='bg-primary-foreground' isIconOnly onClick={() => onRemove(track.index)}>
            <TrashIcon size={30} />
          </Button>
        );
    }
  };

  const bottomContent = (
    <TablePagination pages={pages} page={page} setPage={setPage}>
      <Button className='border bg-primary-foreground ml-10 text-2xl' onClick={onClear} size="lg">
        Clear Player
      </Button>
    </TablePagination>
  );

  return (
    <Table
      {...tableProps}
      aria-label="Media Player Tracks List"
      topContent={topContent}
      bottomContent={bottomContent}>
      <TableHeader columns={playerTracksColumns}>
        {(column) => <TableColumn key={column.uid}>{column.name}</TableColumn>}
      </TableHeader>
      <TableBody emptyContent={`No player tracks found`} items={filteredItems}>
        {(item) => (
          <TableRow
            key={item.trackId}
            className="border-b-1 border-neutral-700">
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
