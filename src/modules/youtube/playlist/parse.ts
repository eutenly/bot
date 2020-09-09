import { ParserData } from "../../../classes/Command/Command";

interface YouTubeChannel {
    id: string;
    name: string;
}

export interface YouTubePlaylist {
    id: string;
    name: string;
    description: string;
    videos: number;
    channel: YouTubeChannel;
    thumbnail?: string;
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
            videos: data.contentDetails.itemCount,
            channel: {
                id: data.snippet.channelId,
                name: data.snippet.channelTitle
            },
            thumbnail: data.snippet.thumbnails.high.url,
            createdOn: data.snippet.publishedAt
        }
    };
}