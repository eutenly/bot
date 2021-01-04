import { ViewData } from "../../../classes/Command/Command";
import UserRequest from "../../../classes/UserRequest/UserRequest";
import { Channel } from "../types";
import videos, { url as videosURL } from "../videos/main";

export default function view(data: Channel | undefined, userRequest: UserRequest): ViewData | undefined {

    // Get prefix
    const prefix: string = userRequest.channel.prefix;

    // No data
    if (!data) return;

    // Get params
    const input: string | undefined = userRequest.getParameter<string>("result") || userRequest.getParameter<string>("link-or-result");
    if (!input) return { error: ":x:  **|  Which result would you like to view?**" };

    // Videos
    if (["videos", "vids"].includes(input.toLowerCase().replace(/\s+/g, ""))) return {
        module: () => videos(userRequest, data.id),
        url: videosURL(data.id)
    };

    // Invalid type
    else return { error: `:x:  **|  You can view this channel's videos with \`${prefix}view videos\`**` };
}