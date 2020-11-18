import { ParserData } from "../../../classes/Command/Command";

export default function parse(data: any): ParserData | undefined {

    // No results
    if (data.error) return;

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