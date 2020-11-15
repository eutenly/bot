import { ParserData } from "../../../classes/Command/Command";

export interface SpotifyPlaylist {
    id: string;
    name: string;
    tracks: number;
}

interface SpotifyTrackArtist {
    id: string;
    name: string;
}

export interface SpotifyTrack {
    id: string;
    name: string;
    artist: SpotifyTrackArtist;
    length: number;
}

export interface SpotifyArtist {
    id: string;
    name: string;
    followers: number;
}

export interface SpotifyHome {
    playlists: SpotifyPlaylist[];
    topTracks: SpotifyTrack[];
    topArtists: SpotifyArtist[];
    recentlyPlayed: SpotifyTrack[];
}

export default function parse(data: any, extraData?: any[]): ParserData | undefined {

    // Parse extra data
    const topTracks: any = extraData && extraData[0];
    const topArtists: any = extraData && extraData[1];
    const recentlyPlayed: any = extraData && extraData[2];

    // Return
    return {
        data: {
            playlists: data.items.map((p: any) => ({
                id: p.id,
                name: p.name,
                tracks: p.tracks.total
            })),
            topTracks: topTracks.items.map((t: any) => ({
                id: t.id,
                name: t.name,
                artist: {
                    id: t.artists[0].id,
                    name: t.artists[0].name
                },
                length: t.duration_ms
            })),
            topArtists: topArtists.items.map((a: any) => ({
                id: a.id,
                name: a.name,
                followers: a.followers.total
            })),
            recentlyPlayed: recentlyPlayed.items.map((t: any) => ({
                id: t.track.id,
                name: t.track.name,
                artist: {
                    id: t.track.artists[0].id,
                    name: t.track.artists[0].name
                },
                length: t.track.duration_ms
            })),
        }
    };
}