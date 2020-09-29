import { ParserData } from "../../../classes/Command/Command";

interface RedditSubreddit {
    id: string;
    name: string;
}

interface RedditUser {
    id: string;
    name: string;
}

export interface RedditPost {
    id: string;
    title: string;
    text: string;
    subreddit: RedditSubreddit;
    score: number;
    comments: number;
    awards: number;
    nsfw: boolean;
    spoiler: boolean;
    linkPath: string;
    user: RedditUser;
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
            subreddit: {
                id: result.data.subreddit_id.split("_")[1],
                name: result.data.subreddit
            },
            score: result.data.score,
            comments: result.data.num_comments,
            awards: result.data.total_awards_received,
            nsfw: result.data.over_18,
            spoiler: result.data.spoiler,
            linkPath: result.data.permalink,
            user: {
                id: result.data.author_fullname.split("_")[1],
                name: result.data.author
            },
            image: result.data.preview?.images[0]?.source.url,
            postedAt: result.data.created * 1000
        }
    };
}