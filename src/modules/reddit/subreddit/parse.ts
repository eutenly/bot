import { ParserData } from "../../../classes/Command/Command";

export interface RedditPost {
    id: string;
    title: string;
    score: number;
}

export interface RedditSubreddit {
    name: string;
    description: string;
    subscribers: number;
    onlineUsers: number;
    nsfw: boolean;
    hotPosts: RedditPost[];
    createdAt: number;
}

export default function parse(data: any, extraData?: any[]): ParserData {

    // No data
    if ((data.data.children) || (!extraData)) return { noData: true };

    // Parse extra data
    const hotPostsData: any = extraData[0];

    // Return
    return {
        data: {
            name: data.data.display_name,
            description: data.data.public_description,
            subscribers: data.data.subscribers,
            onlineUsers: data.data.active_user_count,
            nsfw: data.data.over18,
            hotPosts: hotPostsData.data.children.slice(0, 5).map((d: any) => ({
                id: d.data.name.split("_")[1],
                title: d.data.title,
                score: d.data.score
            })),
            createdAt: data.data.created * 1000
        }
    };
}