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

export default function parse(data: any): TwitterTweet | undefined {

    // No tweet
    if (data.errors) return;

    // Return
    return {
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
    };
}