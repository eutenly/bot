import { ParserData } from "../../../classes/Command/Command";
import parseTweetText from "../parseTweetText";

interface TwitterUser {
    id: string;
    name: string;
    handle: string;
}

export interface TwitterTweet {
    id: string;
    text: string;
    likes: number;
    retweets: number;
    user: TwitterUser;
    quotedTweetID?: string;
    image?: string;
    sentOn: string;
}

export default function parse(data: any): ParserData {

    // No tweet
    if (data.errors) return { noData: true };

    // Authorization failed
    if ((data.errors) && ([215, 32].includes(data.errors[0].code))) return { authorizationFailed: true };

    // Return
    return {
        data: {
            id: data.id_str,
            text: parseTweetText(data),
            likes: data.favorite_count,
            retweets: data.retweet_count,
            user: {
                id: data.user.id_str,
                name: data.user.name,
                handle: data.user.screen_name
            },
            quotedTweetID: data.quoted_status && data.quoted_status.id_str,
            image: data.extended_entities && data.extended_entities.media[0].media_url_https,
            sentOn: data.created_at
        }
    };
}