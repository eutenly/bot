import Command, { ViewData } from "../../../classes/Command/Command";
import UserRequest from "../../../classes/UserRequest/UserRequest";
import release, { url as releaseURL } from "../release/main";
import { ListedRelease } from "../types";

export default function view(data: ListedRelease[], userRequest: UserRequest, command: Command): ViewData | undefined {

    // Get params
    const input: string | undefined = userRequest.getParameter<string>("result") || userRequest.getParameter<string>("link-or-result");
    if (!input) return { error: ":x:  **|  Which result would you like to view?**" };

    // Get result number
    const resultNumber: number = parseInt(input);
    if ((!resultNumber) || (resultNumber < 1)) return { error: ":x:  **|  That result number is invalid**" };

    // Get result
    const result: ListedRelease = data[resultNumber - 1];
    if (!result) return { error: ":x:  **|  That result number is invalid**" };

    // View release
    return {
        module: () => release(userRequest, command.metadata.ownerName, command.metadata.name, result.id, result.tag),
        url: releaseURL(command.metadata.ownerName, command.metadata.name, result.tag)
    };
}