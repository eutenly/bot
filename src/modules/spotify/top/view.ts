import Command, { ViewData } from "../../../classes/Command/Command";
import UserRequest from "../../../classes/UserRequest/UserRequest";
import artist, { url as artistURL } from "../artist/main";
import track, { url as trackURL } from "../track/main";
import { TopItem } from "../types";

export default function view(data: TopItem[], userRequest: UserRequest, command: Command): ViewData | undefined {

    // Get params
    const input: string | undefined = userRequest.getParameter<string>("result") || userRequest.getParameter<string>("link-or-result");
    if (!input) return { error: ":x:  **|  Which result would you like to view?**" };

    // Get result number
    const resultNumber: number = parseInt(input);
    if ((!resultNumber) || (resultNumber < 1)) return { error: ":x:  **|  That result number is invalid**" };

    // Get result
    const result: TopItem = data[resultNumber - 1];
    if (!result) return { error: ":x:  **|  That result number is invalid**" };

    // Run module
    if (command.metadata.type === "tracks") return {
        module: () => track(userRequest, result.id),
        url: trackURL(result.id)
    };
    else if (command.metadata.type === "artists") return {
        module: () => artist(userRequest, result.id),
        url: artistURL(result.id)
    };
}