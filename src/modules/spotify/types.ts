export interface BasicUser {
    id: string;
    name: string;
}

interface BasicAlbum {
    id: string;
    name: string;
}

export interface BasicTrack {
    id: string;
    name: string;
    length: number;
}

export interface Home {
    playlists: ListedPlaylist[];
    topTracks: ListedTrack[];
    topArtists: ListedArtist[];
    recentlyPlayed: ListedTrack[];
}

export interface SearchOverviewResult {
    id: string;
    type: string;
    name: string;
    artist: BasicUser;
    length?: number;
    followers?: number;
    tracks?: number;
}

export interface SearchResult {
    id: string;
    name: string;
    description?: string;
    artist?: BasicUser;
    owner?: BasicUser;
    length?: number;
    followers?: number;
    tracks?: number;
}

export interface ListedAlbum {
    id: string;
    name: string;
    tracks: number;
}

export interface Album {
    id: string;
    name: string;
    artist: BasicUser;
    tracks: BasicTrack[];
    albumArt?: string;
    copyrights: string[];
    releasedOn: string;
}

export interface ListedArtist {
    id: string;
    name: string;
    followers: number;
}

export interface Artist {
    id: string;
    name: string;
    followers: number;
    topTracks: BasicTrack[];
    albums: ListedAlbum[];
    genres: string[];
    avatar?: string;
}

export interface Episode {
    id: string;
    name: string;
    description: string;
    explicit: boolean;
    show: string;
    length: number;
    image?: string;
    copyrights: string[];
}

export interface ListedTrack {
    id: string;
    name: string;
    artist: BasicUser;
    length: number;
}

export interface Track {
    id: string;
    name: string;
    artists: BasicUser[];
    album: BasicAlbum;
    length: number;
    explicit: boolean;
    energy: number;
    tempo: number;
    danceability: number;
    albumArt?: string;
    copyrights: string[];
    releasedOn: string;
    progress?: number;
}

export interface ListedPlaylist {
    id: string;
    name: string;
    description: string;
    owner: BasicUser;
    tracks: number;
}

export interface Playlist {
    id: string;
    name: string;
    description: string;
    ownerName: string;
    followers: number;
    tracks: ListedTrack[];
    image?: string;
}

export interface TopItem {
    id: string;
    name: string;
    artist?: BasicUser;
    length?: number;
    followers?: number;
}