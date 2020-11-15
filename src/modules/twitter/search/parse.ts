import url from "url";
import { ParserData } from "../../../classes/Command/Command";
import parseTweetText from "../parseTweetText";

interface TwitterUser {
    id: string;
    name: string;
    handle: string;
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
    const maxID: string[] | string | undefined = data.search_metadata.next_results && url.parse(data.search_metadata.next_results, true).query.max_id;
    const nextPageToken: string | undefined = maxID instanceof Array ? maxID.join() : maxID;

    // Return
    return {
        data: data.statuses.map((d: any) => ({
            id: d.id_str,
            text: parseTweetText(d),
            likes: d.favorite_count,
            retweets: d.retweet_count,
            user: {
                id: d.user.id_str,
                name: d.user.name,
                handle: d.user.screen_name
            }
        })),
        nextPageToken
    };
}