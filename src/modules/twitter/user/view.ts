import { ViewData } from "../../../classes/Command/Command";
import UserRequest from "../../../classes/UserRequest/UserRequest";
import timeline, { url as timelineURL } from "../timeline/main";
import { User } from "../types";

export default function view(data: User | undefined, userRequest: UserRequest): ViewData | undefined {

    // Get prefix
    const prefix: string = userRequest.channel.prefix;

    // No data
    if (!data) return;

    // Get params
    const input: string | undefined = userRequest.getParameter<string>("result") || userRequest.getParameter<string>("link-or-result");
    if (!input) return { error: ":x:  **|  Which result would you like to view?**" };

    // Tweets
    if (input.toLowerCase().replace(/\s+/g, "") === "tweets") return {
        module: () => timeline(userRequest, data.id),
        url: timelineURL(data.id)
    };

    // Invalid type
    else return { error: `:x:  **|  You can view this user's tweets with the \`${prefix}view tweets\` command**` };
}