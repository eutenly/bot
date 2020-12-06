import { ParserData } from "../../../classes/Command/Command";
import parseTweetText from "../parseTweetText";

export default function parse(data: any, extraData?: any[]): ParserData | undefined {

    // Parse extra data
    const timeline: any = extraData && extraData[0];

    // Return
    return {
        data: {
            tweets: data.map((d: any) => ({
                id: d.id_str,
                text: parseTweetText(d, 50),
                user: {
                    id: d.user.id_str,
                    name: d.user.name,
                    handle: d.user.screen_name,
                    bio: d.user.description
                }
            })),
            timeline: timeline.map((d: any) => ({
                id: d.id_str,
                text: parseTweetText(d, 50),
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