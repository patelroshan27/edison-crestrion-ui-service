import { type Album, type Playlist, type Track } from './types';
import { activeConfigState } from 'state/navigation';
import { useRecoilValue } from 'recoil';
import { useMediaApiState } from 'utils/hooks';
import { useCallback, useMemo, useState } from 'react';

type MuseApiCmdType =
  | 'clearPlayer' // Clear Player Queue
  | 'getPlayerTracks' // GET all queued tracks for a given player
  | 'addToPlayer' // Add playlist or album or a specific track to the Player Queue
  | 'getAlbums2' // Get Albums
  | 'getPlaylists3' // Get Playlists
  | 'getTracksById'; // Get all tracks for a given album Ids, playlist ids, track ids,
// | 'play' //Play the track based on Player Queue and Options, ie Repeat or Shuffle
// | 'playTrack' //Play the track by trackId and track start time from the player queue
// | 'pause' //Pause the track from player queue
// | 'next2' //Go to the next track from player queue
// | 'prev2' //Go to the previous track from player queue
// | 'stop' //Stop the currently playing track from player queue
// | 'repeat' //Repeat the currently playing track, or all the tracks, or repeat OFF from player queue
// | 'shuffle' //Shuffle all the tracks, or shuffle OFF or TOGGLE from player queue
// | 'setPlayerTime'  //Set the playing track time for a given player id
// | 'getPlayerTime'  //Get the playing track time for a given player id
// | 'getPlayerStatus';  //Get the player status for a given player id

interface MediaPlayerRequest {
  clientId?: string;
}

interface BasePlayerRequest extends MediaPlayerRequest {
  playerId: string;
}

interface GetTracksByIdRequest extends MediaPlayerRequest {
  playlistIds: string[];
  trackIds: string[];
  albumIds: string[];
}

type Append = 'OFF' | 'ON';

interface AddToPlayerRequest
  extends MediaPlayerRequest,
    BasePlayerRequest,
    GetTracksByIdRequest {
  append: Append;
}

interface AddToPlayerRequestCmd {
  cmdType: 'addToPlayer';
  payload: AddToPlayerRequest;
}

interface GetAlbumsRequestCmd {
  cmdType: 'getAlbums2';
  payload: MediaPlayerRequest;
}

interface GetPlaylistsRequestCmd {
  cmdType: 'getPlaylists3';
  payload: MediaPlayerRequest;
}

interface GetTracksByIdRequestCmd {
  cmdType: 'getTracksById';
  payload: GetTracksByIdRequest;
}

interface GetPlayerTracksRequestCmd {
  cmdType: 'getPlayerTracks';
  payload: BasePlayerRequest;
}

interface ClearPlayerTracksRequestCmd {
  cmdType: 'clearPlayer';
  payload: BasePlayerRequest;
}

export type MediaPlayerCmd =
  | AddToPlayerRequestCmd
  | GetAlbumsRequestCmd
  | GetPlaylistsRequestCmd
  | GetTracksByIdRequestCmd
  | ClearPlayerTracksRequestCmd
  | GetPlayerTracksRequestCmd;

export interface MediaPlayerApiPayload {
  mediaPlayerCmd: MediaPlayerCmd;
}

interface UsePaginationResult<T> {
  page: number;
  pages: number;
  filteredItems: T[];
  setPage: (page: number) => void;
}
export const useTablePagination = <T>(
  items: T[],
  rowsPerPage = 8,
): UsePaginationResult<T> => {
  const [page, setPage] = useState<number>(1);

  const filteredItems = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return items.slice(start, end);
  }, [page, items]);

  return {
    page,
    pages: Math.ceil(items.length / rowsPerPage),
    setPage,
    filteredItems,
  };
};

function useBuildMediaRequest(): (
  cmdType: MuseApiCmdType,
  payload: any,
) => MediaPlayerApiPayload {
  const config = useRecoilValue(activeConfigState);

  return (cmdType, payload) => {
    return {
      mediaPlayerCmd: {
        cmdType,
        payload: {
          clientId: config.authID,
          albumIds: [],
          playlistIds: [],
          trackIds: [],
          ...payload,
        },
      },
    };
  };
}

function useMediaApiRequest<T>(type: MuseApiCmdType): () => Promise<T> {
  const sendMediaCmd = useMediaApiState<T>();
  const buildRequest = useBuildMediaRequest();

  return useCallback(
    (data = {}) => sendMediaCmd(buildRequest(type, data)),
    [type, sendMediaCmd, buildRequest],
  );
}

export function useGetAlbumsApi(): () => Promise<Album[]> {
  return useMediaApiRequest('getAlbums2');
}

export function useGetPlaylistsApi(): () => Promise<Playlist[]> {
  return useMediaApiRequest('getPlaylists3');
}

export function useGetTracksByIdApi(): (
  data: Partial<GetTracksByIdRequest>,
) => Promise<Track[]> {
  return useMediaApiRequest('getTracksById');
}

export function useGetPlayerTracksApi(): (
  data: BasePlayerRequest,
) => Promise<Track[]> {
  return useMediaApiRequest('getPlayerTracks');
}

export function useAddToPlayerApi(): (
  data: Partial<AddToPlayerRequest>,
) => Promise<unknown> {
  return useMediaApiRequest('addToPlayer');
}

export function useClearPlayerTracksApi(): (
  data: BasePlayerRequest,
) => Promise<unknown> {
  return useMediaApiRequest('clearPlayer');
}
