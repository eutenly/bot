import { ParserData } from "../../../classes/Command/Command";

export default function parse(data: any): ParserData | undefined {

    // Get result
    const result: any = data.data.children[0];

    // No results
    if (!result) return;

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