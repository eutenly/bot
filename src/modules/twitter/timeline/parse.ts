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

export default function parse(data?: any): ParserData {

    // No data
    if (!data) return { noData: true };

    // Authorization failed
    if ((data.errors) && ([215, 32].includes(data.errors[0].code))) return { authorizationFailed: true };

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