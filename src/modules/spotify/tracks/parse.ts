import { ParserData } from "../../../classes/Command/Command";

export default function parse(data?: any, extraData?: any[], metadata?: any): ParserData | undefined {

    // No data
    if (!data) return;

    // Get results
    const results: any[] = metadata?.type === "playlist" ? data.items.map((d: any) => d.track) : (data.items || data.tracks);

    // No results
    if (results.length === 0) return;

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