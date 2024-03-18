import {
  type PlayerStatus,
  type Album,
  type Playlist,
  type Track,
} from './types';
import { activeConfigState } from 'state/navigation';
import { useRecoilValue } from 'recoil';
import { useMediaApiState } from 'utils/hooks';
import { useCallback, useMemo, useState } from 'react';

type MediaPlayerApiCmdType = 'getAlbums' | 'getPlaylists3';
type BasePlayerApiCmdType =
  | 'getPlayerTracks'
  | 'clearPlayer'
  | 'play'
  | 'pause'
  | 'stop'
  | 'prev2'
  | 'next2'
  | 'getPlayerStatus';
type MuseApiCmdType =
  | BasePlayerApiCmdType
  | MediaPlayerApiCmdType
  | 'addToPlayer'
  | 'getTracksById'
  | 'playTrack'
  | 'repeat'
  | 'deleteFromPlayer'
  | 'shuffle';
// | 'setPlayerTime'  //Set the playing track time for a given player id
// | 'getPlayerTime'  //Get the playing track time for a given player id

interface MediaPlayerRequest {
  clientId?: string;
}

export interface BasePlayerRequest extends MediaPlayerRequest {
  playerId: string;
}

interface GetTracksByIdRequest extends MediaPlayerRequest {
  playlistIds: string[];
  trackIds: string[];
  albumIds: string[];
}

type Append = 'OFF' | 'ON';
type Shuffle = 'OFF' | 'ON' | 'TOGGLE';
type Repeat = 'OFF' | 'ITEM' | 'ALL';

interface ShuffleRequest extends MediaPlayerRequest, BasePlayerRequest {
  shuffle: Shuffle;
}

interface PlayTrackRequest extends MediaPlayerRequest, BasePlayerRequest {
  trackId: string;
  trackStartTime: number;
}

interface AddToPlayerRequest
  extends MediaPlayerRequest,
    BasePlayerRequest,
    GetTracksByIdRequest {
  append: Append;
}

interface RepeatRequest extends MediaPlayerRequest, BasePlayerRequest {
  repeat: Repeat;
}

interface DeleteTracksPlayerRequest extends BasePlayerRequest {
  trackIndexes: string[];
}

interface AddToPlayerRequestCmd {
  cmdType: 'addToPlayer';
  payload: AddToPlayerRequest;
}

interface GetTracksByIdRequestCmd {
  cmdType: 'getTracksById';
  payload: GetTracksByIdRequest;
}

interface PlayTrackRequestCmd {
  cmdType: 'playTrack';
  payload: PlayTrackRequest;
}

interface DeleteTracksPlayerRequestCmd {
  cmdType: 'deleteFromPlayer';
  payload: DeleteTracksPlayerRequest;
}

interface MediaPlayerRequestCmd {
  cmdType: MediaPlayerApiCmdType;
  payload: MediaPlayerRequest;
}

interface BasePlayerRequestCmd {
  cmdType: BasePlayerApiCmdType;
  payload: BasePlayerRequest;
}

interface ShuffleRequestCmd {
  cmdType: 'shuffle';
  payload: ShuffleRequest;
}

interface RepeatRequestCmd {
  cmdType: 'repeat';
  payload: RepeatRequest;
}

export type MediaPlayerCmd =
  | AddToPlayerRequestCmd
  | GetTracksByIdRequestCmd
  | MediaPlayerRequestCmd
  | ShuffleRequestCmd
  | PlayTrackRequestCmd
  | RepeatRequestCmd
  | DeleteTracksPlayerRequestCmd
  | BasePlayerRequestCmd;

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
  rowsPerPage = 6,
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
          ...(cmdType === 'addToPlayer' ? { append: 'ON' } : {}),
          ...(cmdType === 'shuffle' ? { shuffle: 'TOGGLE' } : {}),
          ...(cmdType === 'repeat' ? { repeat: 'ALL' } : {}),
          ...(cmdType === 'getTracksById' || cmdType === 'addToPlayer'
            ? {
                albumIds: [],
                playlistIds: [],
                trackIds: [],
              }
            : {}),
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

interface PlayerStatusResponse {
  playerStatus: PlayerStatus;
}
type MediaApi<R, P = undefined> = (data?: P) => Promise<R>;
export type AlbumsByName = Record<string, Album[]>;

export function useGetAlbumsApi(): MediaApi<AlbumsByName> {
  return useMediaApiRequest('getAlbums');
}

export function useGetPlaylistsApi(): MediaApi<Playlist[]> {
  return useMediaApiRequest('getPlaylists3');
}

export function useGetTracksByIdApi(): MediaApi<
  Track[],
  Partial<GetTracksByIdRequest>
> {
  return useMediaApiRequest('getTracksById');
}

export function useGetPlayerTracksApi(): MediaApi<
  Track[],
  Partial<BasePlayerRequest>
> {
  return useMediaApiRequest('getPlayerTracks');
}

export function useAddToPlayerApi(): MediaApi<
  void,
  Partial<AddToPlayerRequest>
> {
  return useMediaApiRequest('addToPlayer');
}

export function useClearPlayerTracksApi(): MediaApi<void, BasePlayerRequest> {
  return useMediaApiRequest('clearPlayer');
}

export function usePlayerPlayApi(): MediaApi<void, BasePlayerRequest> {
  return useMediaApiRequest('play');
}

export function usePlayerPauseApi(): MediaApi<void, BasePlayerRequest> {
  return useMediaApiRequest('pause');
}

export function usePlayerStopApi(): MediaApi<void, BasePlayerRequest> {
  return useMediaApiRequest('stop');
}

export function usePlayerNextApi(): MediaApi<void, BasePlayerRequest> {
  return useMediaApiRequest('next2');
}

export function usePlayerPrevApi(): MediaApi<void, BasePlayerRequest> {
  return useMediaApiRequest('prev2');
}

export function useGetPlayerStatusApi(): MediaApi<
  PlayerStatusResponse,
  BasePlayerRequest
> {
  return useMediaApiRequest('getPlayerStatus');
}

export function usePlayerPlayTrackApi(): MediaApi<void, PlayTrackRequest> {
  return useMediaApiRequest('playTrack');
}

export function usePlayerShuffleApi(): MediaApi<void, Partial<ShuffleRequest>> {
  return useMediaApiRequest('shuffle');
}

export function usePlayerRepeatApi(): MediaApi<void, Partial<RepeatRequest>> {
  return useMediaApiRequest('repeat');
}

export function useDeletePlayerTracksApi(): MediaApi<
  void,
  DeleteTracksPlayerRequest
> {
  return useMediaApiRequest('deleteFromPlayer');
}
