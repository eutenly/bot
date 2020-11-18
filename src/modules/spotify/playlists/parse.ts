import { ParserData } from "../../../classes/Command/Command";

export default function parse(data?: any): ParserData | undefined {

    // No data
    if (data.items.length === 0) return;

    // Return
    return {
        data: data.items.map((d: any) => ({
            id: d.id,
            name: d.name,
            description: d.description,
            owner: {
                id: d.owner.id,
                name: d.owner.display_name
            },
            tracks: d.tracks.total
        }))
    };
}