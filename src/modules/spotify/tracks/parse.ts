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

export default function parse(data?: any, extraData?: any[], metadata?: any): ParserData {

    // Get results
    const results: any[] = metadata?.type === "playlist" ? data.items.map((d: any) => d.track) : data.items;

    // No data
    if (results.length === 0) return { noData: true };

    // Return
    return {
        data: results.map((d: any) => ({
            id: d.id,
            name: d.name,
            artist: {
                id: d.artists[0].id,
                name: d.artists[0].name
            },
            length: d.duration_ms
        }))
    };
}