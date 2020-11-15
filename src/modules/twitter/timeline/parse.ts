import { ParserData } from "../../../classes/Command/Command";
import parseTweetText from "../parseTweetText";

interface TwitterUser {
    id: string;
    name: string;
    handle: string;
    bio: string;
}

export interface TwitterSearchResult {
    id: string;
    text: string;
    likes: number;
    retweets: number;
    user: TwitterUser;
}

export default function parse(data?: any): ParserData | undefined {

    // No data
    if (!data) return;

    // Get next page token
    const nextPageToken: string = data[data.length - 1].id_str;

    // Filter out replies
    data = data.filter((d: any) => !d.in_reply_to_status_id_str);

    // Return
    return {
        data: data.map((d: any) => ({
            id: d.id_str,
            text: parseTweetText(d),
            likes: d.favorite_count,
            retweets: d.retweet_count,
            user: {
                id: d.user.id_str,
                name: d.user.name,
                handle: d.user.screen_name,
                bio: d.user.description
            }
        })),
        nextPageToken
    };
}