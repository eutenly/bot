import { ParserData } from "../../../classes/Command/Command";

export interface RedditPost {
    id: string;
    title: string;
    subredditName: string;
    score: number;
}

export interface RedditHome {
    name: string;
    totalKarma: number;
    postKarma: number;
    commentKarma: number;
    awardeeKarma: number;
    awarderKarma: number;
    posts: RedditPost[];
    feed: RedditPost[];
}

export default function parse(data: any, extraData?: any[]): ParserData {

    // Parse extra data
    const posts: any = extraData && extraData[0];
    const feed: any = extraData && extraData[1];

    // Return
    return {
        data: {
            name: data.name,
            totalKarma: data.total_karma,
            postKarma: data.link_karma,
            commentKarma: data.comment_karma,
            awardeeKarma: data.awardee_karma,
            awarderKarma: data.awarder_karma,
            posts: posts.data.children.slice(0, 5).map((d: any) => ({
                id: d.data.name.split("_")[1],
                title: d.data.title,
                subredditName: d.data.subreddit,
                score: d.data.score
            })),
            feed: feed.data.children.slice(0, 5).map((d: any) => ({
                id: d.data.name.split("_")[1],
                title: d.data.title,
                subredditName: d.data.subreddit,
                score: d.data.score
            }))
        }
    };
}