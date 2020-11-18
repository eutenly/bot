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
            subscribers: parseInt(data.statistics.subscriberCount),
            subscribersHidden: data.statistics.hiddenSubscriberCount,
            views: parseInt(data.statistics.viewCount),
            videos: parseInt(data.statistics.videoCount),
            avatar: data.snippet.thumbnails.high.url,
            createdOn: data.snippet.publishedAt
        }
    };
}