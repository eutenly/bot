import { ParserData } from "../../../classes/Command/Command";

export default function parse(data: any, extraData?: any[]): ParserData | undefined {

    // No data
    if ((data.error === 404) || (!extraData)) return;

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
                subredditName: d.data.subreddit,
                score: d.data.score
            })),
            createdAt: data.data.created * 1000
        }
    };
}