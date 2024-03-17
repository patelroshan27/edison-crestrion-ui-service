export type MediaItemType = 'album' | 'playlist' | 'track' | 'playerTrack';

export interface Album {
  albumId: string;
  albumName: string;
  artistId: string;
  artiestName: string;
  albumTracksCount: number;
}

export interface Playlist {
  playlistId: string;
  playlistName: string;
  playlistTracksCount: number;
}

export interface Track {
  trackId: string;
  trackName: string;
  albumId: string;
  albumName: string;
  trackDuration: number;
}
