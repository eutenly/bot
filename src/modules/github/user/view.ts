import { ViewData } from "../../../classes/Command/Command";
import UserRequest from "../../../classes/UserRequest/UserRequest";
import events, { url as eventsURL } from "../events/main";
import gists, { url as gistsURL } from "../gists/main";
import repos, { url as reposURL } from "../repos/main";
import { User } from "../types";

export default function view(data: User | undefined, userRequest: UserRequest): ViewData | undefined {

    // No data
    if (!data) return;

    // Get params
    const input: string | undefined = userRequest.getParameter<string>("result") || userRequest.getParameter<string>("link-or-result");
    if (!input) return { error: ":x:  **|  Which result would you like to view?**" };

    // Repos
    if (["repositories", "repos"].includes(input.toLowerCase().replace(/\s+/g, ""))) return {
        module: () => repos(userRequest, data.name),
        url: reposURL(data.name)
    };

    // Gists
    else if (input.toLowerCase().replace(/\s+/g, "") === "gists") return {
        module: () => gists(userRequest, data.name),
        url: gistsURL(data.name)
    };

    // Events
    else if (input.toLowerCase().replace(/\s+/g, "") === "events") return {
        module: () => events(userRequest, data.name, "user"),
        url: eventsURL(data.name)
    };

    // Invalid type
    return { error: ":x:  **|  That's not something you can view**" };
}