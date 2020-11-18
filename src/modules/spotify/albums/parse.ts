import { ParserData } from "../../../classes/Command/Command";

export default function parse(data?: any): ParserData | undefined {

    // No data
    if (data.items.length === 0) return;

    // Return
    return {
        data: data.items.map((d: any) => ({
            id: d.id,
            name: d.name,
            tracks: d.total_tracks
        }))
    };
}