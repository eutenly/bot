import { ParserData } from "../../../classes/Command/Command";

export default function parse(data: any): ParserData | undefined {

    // No results
    if (data.error) return;

    // Return
    return {
        data: {
            id: data.id,
            name: data.name,
            artist: {
                id: data.artists[0].id,
                name: data.artists[0].name
            },
            tracks: data.tracks.items.slice(0, 5).map((t: any) => ({
                id: t.id,
                name: t.name,
                length: t.duration_ms
            })),
            albumArt: data.images[0] && data.images[0].url,
            copyrights: [...new Set(data.copyrights.map((c: any) => c.text))],
            releasedOn: data.release_date
        }
    };
}