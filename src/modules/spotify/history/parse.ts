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

export default function parse(data?: any): ParserData {

    // No data
    if (data.items.length === 0) return { noData: true };

    // Return
    return {
        data: data.items.map((d: any) => ({
            id: d.track.id,
            name: d.track.name,
            artist: {
                id: d.track.artists[0].id,
                name: d.track.artists[0].name
            },
            length: d.track.duration_ms
        })),
        nextPageToken: data.cursors.before || null
    };
}