import { ParserData } from "../../../classes/Command/Command";
import parseTweetText from "../parseTweetText";

interface TwitterUser {
    id: string;
    name: string;
    handle: string;
    bio: string;
}

export interface TwitterTweet {
    id: string;
    text: string;
    user: TwitterUser;
}

export interface TwitterHome {
    tweets: TwitterTweet[];
    timeline: TwitterTweet[];
}

export default function parse(data: any, extraData?: any[]): ParserData {

    // Parse extra data
    const timeline: any = extraData && extraData[0];

    // Return
    return {
        data: {
            tweets: data.map((d: any) => ({
                id: d.id_str,
                text: parseTweetText(d),
                user: {
                    id: d.user.id_str,
                    name: d.user.name,
                    handle: d.user.screen_name,
                    bio: d.user.description
                }
            })),
            timeline: timeline.map((d: any) => ({
                id: d.id_str,
                text: parseTweetText(d),
                user: {
                    id: d.user.id_str,
                    name: d.user.name,
                    handle: d.user.screen_name,
                    bio: d.user.description
                }
            }))
        }
    };
}