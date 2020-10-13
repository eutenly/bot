import { ParserData } from "../../../classes/Command/Command";

export interface RedditPost {
    id: string;
    title: string;
    text: string;
    subredditName: string;
    score: number;
    comments: number;
    awards: number;
    nsfw: boolean;
    spoiler: boolean;
    linkPath: string;
    user: string;
    image?: string;
    postedAt: number;
}

export default function parse(data: any): ParserData {

    // Get result
    const result: any = data.data.children[0];

    // No results
    if (!result) return { noData: true };

    // Return
    return {
        data: {
            id: result.data.name.split("_")[1],
            title: result.data.title,
            text: result.data.selftext,
            subredditName: result.data.subreddit,
            score: result.data.score,
            comments: result.data.num_comments,
            awards: result.data.total_awards_received,
            nsfw: result.data.over_18,
            spoiler: result.data.spoiler,
            linkPath: result.data.permalink,
            user: result.data.author,
            image: result.data.preview?.images[0]?.source.url,
            postedAt: result.data.created * 1000
        }
    };
}