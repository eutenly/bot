import ent from "ent";
import { ParserData } from "../../../classes/Command/Command";

export default function parse(data: any): ParserData | undefined {

    // Parse data
    data = data.data.items && data.data.items[0];
    if (!data) return;

    // Return
    return {
        data: {
            id: data.id,
            name: ent.decode(data.snippet.title),
            description: ent.decode(data.snippet.description),
            videos: data.contentDetails.itemCount,
            channel: {
                id: data.snippet.channelId,
                name: ent.decode(data.snippet.channelTitle)
            },
            thumbnail: data.snippet.thumbnails.high.url,
            createdOn: data.snippet.publishedAt
        }
    };
}