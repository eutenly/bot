import { ParserData } from "../../../classes/Command/Command";

export interface YouTubeChannel {
    id: string;
    name: string;
    description: string;
    subscribers: number;
    subscribersHidden: boolean;
    views: number;
    videos: number;
    avatar?: string;
    createdOn: string;
}

export default function parse(data: any): ParserData {

    // Parse data
    data = data.data.items && data.data.items[0];
    if (!data) return { noData: true };

    // Return
    return {
        data: {
            id: data.id,
            name: data.snippet.title,
            description: data.snippet.description,
            subscribers: parseInt(data.statistics.subscriberCount),
            subscribersHidden: data.statistics.hiddenSubscriberCount,
            views: parseInt(data.statistics.viewCount),
            videos: parseInt(data.statistics.videoCount),
            avatar: data.snippet.thumbnails.high.url,
            createdOn: data.snippet.publishedAt
        }
    };
}