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
            title: ent.decode(data.snippet.title),
            description: ent.decode(data.snippet.description),
            views: parseInt(data.statistics.viewCount),
            length: data.contentDetails.duration,
            likes: parseInt(data.statistics.likeCount),
            dislikes: parseInt(data.statistics.dislikeCount),
            comments: parseInt(data.statistics.commentCount),
            captions: data.contentDetails.caption === "true",
            channel: {
                id: data.snippet.channelId,
                name: ent.decode(data.snippet.channelTitle)
            },
            thumbnail: data.snippet.thumbnails.high.url,
            uploadedOn: data.snippet.publishedAt
        }
    };
}