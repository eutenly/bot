import { ParserData } from "../../../classes/Command/Command";
import parseTweetText from "../parseTweetText";

export default function parse(data: any): ParserData | undefined {

    // No tweet
    if (data.errors) return;

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
                handle: data.user.screen_name,
                bio: data.user.description
            },
            quotedTweet: data.quoted_status && {
                id: data.quoted_status.id_str,
                user: {
                    id: data.quoted_status.user.id_str,
                    name: data.quoted_status.user.name,
                    handle: data.quoted_status.user.screen_name,
                    bio: data.quoted_status.user.description
                }
            },
            image: data.extended_entities && data.extended_entities.media[0].media_url_https,
            sentOn: data.created_at
        }
    };
}