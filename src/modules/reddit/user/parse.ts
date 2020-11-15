import { ParserData } from "../../../classes/Command/Command";

export interface RedditPost {
    id: string;
    title: string;
    subredditName: string;
    score: number;
}

export interface RedditUser {
    name: string;
    bio: string;
    hasPremium: boolean;
    totalKarma: number;
    postKarma: number;
    commentKarma: number;
    awardeeKarma: number;
    awarderKarma: number;
    posts: RedditPost[];
    createdAt: number;
}

export default function parse(data: any, extraData?: any[]): ParserData | undefined {

    // No data
    if ((data.error === 404) || (!extraData)) return;

    // Parse extra data
    const postsData: any = extraData[0];

    // Return
    return {
        data: {
            name: data.data.name,
            bio: data.data.subreddit.public_description,
            hasPremium: data.data.is_gold,
            totalKarma: data.data.total_karma,
            postKarma: data.data.link_karma,
            commentKarma: data.data.comment_karma,
            awardeeKarma: data.data.awardee_karma,
            awarderKarma: data.data.awarder_karma,
            posts: postsData.data.children.slice(0, 5).map((d: any) => ({
                id: d.data.name.split("_")[1],
                title: d.data.title,
                subredditName: d.data.subreddit,
                score: d.data.score
            })),
            createdAt: data.data.created * 1000
        }
    };
}