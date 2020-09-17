import { ParserData } from "../../../classes/Command/Command";

export interface SpotifyAlbum {
    id: string;
    name: string;
    tracks: number;
}

export default function parse(data?: any): ParserData {

    // No data
    if (data.items.length === 0) return { noData: true };

    // Return
    return {
        data: data.items.map((d: any) => ({
            id: d.id,
            name: d.name,
            tracks: d.total_tracks
        }))
    };
}