import { ParserData } from "../../../classes/Command/Command";
import parseTweetText from "../parseTweetText";

interface TwitterUser {
    id: string;
    name: string;
    handle: string;
}

interface TwitterQuotedTweet {
    id: string;
    user: TwitterUser;
}

export interface TwitterTweet {
    id: string;
    text: string;
    likes: number;
    retweets: number;
    user: TwitterUser;
    quotedTweet?: TwitterQuotedTweet;
    image?: string;
    sentOn: string;
}

export default function parse(data: any): ParserData {

    // No tweet
    if (data.errors) return { noData: true };

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
            quotedTweet: data.quoted_status && {
                id: data.quoted_status.id_str,
                user: {
                    id: data.quoted_status.user.id_str,
                    name: data.quoted_status.user.name,
                    handle: data.quoted_status.user.screen_name
                }
            },
            image: data.extended_entities && data.extended_entities.media[0].media_url_https,
            sentOn: data.created_at
        }
    };
}