import { ParserData } from "../../../classes/Command/Command";

interface SpotifyArtist {
    id: string;
    name: string;
}

export interface SpotifyTrack {
    id: string;
    name: string;
    artist: SpotifyArtist;
    length: number;
}

export interface SpotifyPlaylist {
    id: string;
    name: string;
    description: string;
    ownerName: string;
    followers: number;
    tracks: SpotifyTrack[];
    image?: string;
}

export default function parse(data: any): ParserData {

    // No results
    if (data.error) return { noData: true };

    // Return
    return {
        data: {
            id: data.id,
            name: data.name,
            description: data.description,
            ownerName: data.owner.display_name,
            followers: data.followers.total,
            tracks: data.tracks.items.slice(0, 5).map((t: any) => ({
                id: t.track.id,
                name: t.track.name,
                artist: {
                    id: t.track.artists[0].id,
                    name: t.track.artists[0].name
                },
                length: t.track.duration_ms
            })),
            image: data.images[0] && data.images[0].url
        }
    };
}