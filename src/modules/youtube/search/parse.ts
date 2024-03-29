import ent from "ent";
import { ParserData } from "../../../classes/Command/Command";

export default function parse(data?: any): ParserData | undefined {

    // No data
    if (!data) return;

    // Return
    return {
        data: data.data.items.map((d: any) => {

            // Get type
            let type: string | undefined;
            if (d.id.kind === "youtube#video") type = "video";
            else if (d.id.kind === "youtube#channel") type = "channel";
            else if (d.id.kind === "youtube#playlist") type = "playlist";

            // Return
            return {
                id: d.id.videoId || d.id.channelId || d.id.playlistId,
                title: ent.decode(d.snippet.title),
                type,
                description: ent.decode(d.snippet.description),
                channel: {
                    id: d.snippet.channelId,
                    name: ent.decode(d.snippet.channelTitle)
                },
                createdAt: d.snippet.publishedAt
            };
        }),
        nextPageToken: data.data.nextPageToken || null
    };
}