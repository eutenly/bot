import { ParserData } from "../../../classes/Command/Command";

export default function parse(data: any, extraData?: any[]): ParserData | undefined {

    // No results
    if ((data.error) || (!extraData)) return;

    // Parse extra data
    const albumData: any = extraData[0];

    // Return
    return {
        data: {
            id: data.id,
            name: data.name,
            followers: data.followers.total,
            albums: albumData.items.map((a: any) => ({
                id: a.id,
                name: a.name,
                tracks: a.total_tracks
            })),
            genres: data.genres,
            avatar: data.images[0] && data.images[0].url
        }
    };
}