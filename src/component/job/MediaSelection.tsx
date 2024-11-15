import React, { useEffect, useState } from 'react';
import {
  useAlbumsAndPlaylistsById,
  useGetTracksByIdApi,
} from 'component/media/hooks';
import { type SelectedMediaIds } from 'component/media/MediaPlayer';
import { TracksTable } from 'component/media/TracksTable';
import { type Track } from 'component/media/types';
import { Chip, type TableProps } from '@nextui-org/react';
import { AlbumsAndPlaylists } from 'component/media/AlbumsAndPlaylists';

interface MediaSelectionProps {
  onAddToQueue: (ids: SelectedMediaIds) => void;
  removeFromQueue: (type: keyof SelectedMediaIds, idToRemove: string) => void;
  queuedIds?: SelectedMediaIds;
}

const tableProps: Partial<TableProps> = {
  hideHeader: true,
  layout: 'fixed',
  classNames: {
    base: 'flex-grow-[1] w-2/5',
    wrapper: 'bg-background h-full justify-between gap-0',
    td: 'text-2xl text-primary first:truncate first:w-[65%]',
  },
};

interface MediaSelectionViewProps {
  queuedIds?: SelectedMediaIds;
  removeFromQueue: (type: keyof SelectedMediaIds, idToRemove: string) => void;
}

const MediaSelectionView: React.FC<MediaSelectionViewProps> = ({
  queuedIds,
  removeFromQueue,
}) => {
  const { albumsById, playlistsById } = useAlbumsAndPlaylistsById();

  return (
    <div className="flex gap-1 flex-wrap">
      {queuedIds?.albumIds?.map((id) => (
        <Chip
          key={id}
          color="success"
          onClose={() => removeFromQueue('albumIds', id)}
          size="lg">
          {albumsById[id]?.albumName ?? id}
        </Chip>
      ))}
      {queuedIds?.playlistIds?.map((id) => (
        <Chip
          key={id}
          color="success"
          onClose={() => removeFromQueue('playlistIds', id)}
          size="lg">
          {playlistsById[id]?.playlistName ?? id}
        </Chip>
      ))}
      {queuedIds?.trackIds?.map((id) => (
        <Chip
          key={id}
          color="success"
          onClose={() => removeFromQueue('trackIds', id)}
          size="lg">{`Track ${id}`}</Chip>
      ))}
    </div>
  );
};

const TracksTopContent = () => (
  <div className="flex justify-center items-center text-lg font-bold">
    <Chip className="text-2xl p-6" color="primary" size="lg">
      Tracks
    </Chip>
  </div>
);

export const MediaSelection: React.FC<MediaSelectionProps> = ({
  queuedIds,
  onAddToQueue,
  removeFromQueue,
}) => {
  const getTracksById = useGetTracksByIdApi();
  const [selectedIds, setSelectedIds] = useState<SelectedMediaIds>();
  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    if (selectedIds) {
      getTracksById(selectedIds)
        .then(setTracks)
        .catch((err) => console.log(err));
    }
  }, [selectedIds]);

  return (
    <>
      <div className="flex gap-1">
        <AlbumsAndPlaylists
          onSelection={setSelectedIds}
          onAddToQueue={onAddToQueue}
          rowsPerPage={6}
        />
        <TracksTable
          tableProps={tableProps}
          tracks={tracks}
          topContent={<TracksTopContent />}
          onAddToQueue={onAddToQueue}
          rowsPerPage={6}
        />
      </div>
      <MediaSelectionView
        queuedIds={queuedIds}
        removeFromQueue={removeFromQueue}
      />
    </>
  );
};
