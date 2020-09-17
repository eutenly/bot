import { ParserData } from "../../../classes/Command/Command";

interface YouTubeChannel {
    id: string;
    name: string;
}

export interface YouTubeVideo {
    id: string;
    title: string;
    description: string;
    views: number;
    length: string;
    likes: number;
    dislikes: number;
    comments: number;
    channel: YouTubeChannel;
    thumbnail?: string;
    uploadedOn: string;
}

export default function parse(data: any): ParserData {

    // Parse data
    data = data.data.items && data.data.items[0];
    if (!data) return { noData: true };

    // Return
    return {
        data: {
            id: data.id,
            title: data.snippet.title,
            description: data.snippet.description,
            views: parseInt(data.statistics.viewCount),
            length: data.contentDetails.duration,
            likes: parseInt(data.statistics.likeCount),
            dislikes: parseInt(data.statistics.dislikeCount),
            comments: parseInt(data.statistics.commentCount),
            channel: {
                id: data.snippet.channelId,
                name: data.snippet.channelTitle
            },
            thumbnail: data.snippet.thumbnails.high.url,
            uploadedOn: data.snippet.publishedAt
        }
    };
}