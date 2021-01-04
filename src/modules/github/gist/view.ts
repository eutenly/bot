import Command, { ViewData } from "../../../classes/Command/Command";
import UserRequest from "../../../classes/UserRequest/UserRequest";
import gists, { url as gistsURL } from "../gists/main";
import { Gist } from "../types";
import user, { url as userURL } from "../user/main";

export default function view(data: Gist | undefined, userRequest: UserRequest, command: Command): ViewData | undefined {

    // No data
    if (!data) return;

    // Get params
    const input: string | undefined = userRequest.getParameter<string>("result") || userRequest.getParameter<string>("link-or-result");
    if (!input) return { error: ":x:  **|  Which result would you like to view?**" };

    // User
    if (input.toLowerCase().replace(/\s+/g, "") === "user") return {
        module: () => user(userRequest, command.metadata.name),
        url: userURL(command.metadata.name)
    };

    // Gists
    else if (input.toLowerCase().replace(/\s+/g, "") === "gists") return {
        module: () => gists(userRequest, command.metadata.name),
        url: gistsURL(command.metadata.name)
    };

    // Invalid type
    return { error: ":x:  **|  That's not something you can view**" };
}