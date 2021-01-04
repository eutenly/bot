import Command, { ViewData } from "../../../classes/Command/Command";
import UserRequest from "../../../classes/UserRequest/UserRequest";
import prs, { url as prsURL } from "../prs/main";
import repo, { url as repoURL } from "../repo/main";
import { PR } from "../types";
import user, { url as userURL } from "../user/main";

export default function view(data: PR | undefined, userRequest: UserRequest, command: Command): ViewData | undefined {

    // No data
    if (!data) return;

    // Get params
    const input: string | undefined = userRequest.getParameter<string>("result") || userRequest.getParameter<string>("link-or-result");
    if (!input) return { error: ":x:  **|  Which result would you like to view?**" };

    // User
    if (input.toLowerCase().replace(/\s+/g, "") === "user") return {
        module: () => user(userRequest, data.user),
        url: userURL(data.user)
    };

    // Repo
    else if (input.toLowerCase().replace(/\s+/g, "") === "repo") return {
        module: () => repo(userRequest, command.metadata.ownerName, command.metadata.name),
        url: repoURL(command.metadata.ownerName, command.metadata.name)
    };

    // Pull requests
    else if (["pullrequests", "prs"].includes(input.toLowerCase().replace(/\s+/g, ""))) return {
        module: () => prs(userRequest, command.metadata.ownerName, command.metadata.name),
        url: prsURL(command.metadata.ownerName, command.metadata.name)
    };

    // Invalid type
    return { error: ":x:  **|  That's not something you can view**" };
}