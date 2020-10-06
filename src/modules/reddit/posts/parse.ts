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
    user: string;
}

export default function parse(data?: any): ParserData {

    // No data
    if (data.data.children.length === 0) return { noData: true };

    // Return
    return {
        data: data.data.children.slice(0, 5).map((d: any) => ({
            id: d.data.name.split("_")[1],
            title: d.data.title || d.data.link_title,
            text: d.data.selftext || d.data.body,
            subredditName: d.data.subreddit,
            score: d.data.score,
            comments: d.data.num_comments,
            awards: d.data.total_awards_received,
            nsfw: d.data.over_18,
            spoiler: d.data.spoiler,
            user: d.data.author
        })),
        nextPageToken: data.data.after
    };
}