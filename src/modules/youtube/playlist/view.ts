import { ViewData } from "../../../classes/Command/Command";
import UserRequest from "../../../classes/UserRequest/UserRequest";
import channel, { url as channelURL } from "../channel/main";
import { Playlist } from "../types";

export default function view(data: Playlist | undefined, userRequest: UserRequest): ViewData | undefined {

    // Get prefix
    const prefix: string = userRequest.channel.prefix;

    // No data
    if (!data) return;

    // Get params
    const input: string | undefined = userRequest.getParameter<string>("result") || userRequest.getParameter<string>("link-or-result");
    if (!input) return { error: ":x:  **|  Which result would you like to view?**" };

    // Channel
    if (input.toLowerCase().replace(/\s+/g, "") === "channel") return {
        module: () => channel(userRequest, data.channel.id),
        url: channelURL(data.channel.id)
    };

    // Invalid type
    else return { error: `:x:  **|  You can view the channel with \`${prefix}view channel\`**` };
}