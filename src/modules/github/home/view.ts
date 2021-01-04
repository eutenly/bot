import { ViewData } from "../../../classes/Command/Command";
import UserRequest from "../../../classes/UserRequest/UserRequest";
import repo, { url as repoURL } from "../repo/main";
import repos, { url as reposURL } from "../repos/main";
import { Home, HomeRepo } from "../types";

export default function view(data: Home | undefined, userRequest: UserRequest): ViewData | undefined {

    // No data
    if (!data) return;

    // Get params
    const input: string | undefined = userRequest.getParameter<string>("result") || userRequest.getParameter<string>("link-or-result");
    if (!input) return { error: ":x:  **|  What would you like to view?**" };

    // Watched repos
    if (input.toLowerCase().replace(/\s+/g, "") === "watchedrepos") return {
        module: () => repos(userRequest, data.username, "subscriptions"),
        url: reposURL(data.username)
    };

    // Starred repos
    else if (input.toLowerCase().replace(/\s+/g, "") === "starredrepos") return {
        module: () => repos(userRequest, data.username, "starred"),
        url: reposURL(data.username)
    };

    // Get item type
    const itemType: string = input.split("-")[0].toLowerCase();
    if (!["w", "s"].includes(itemType)) return { error: ":x:  **|  That's not something you can view**" };

    // Get item number
    const itemNumber: number = parseInt(input.split("-").slice(1).join("-"));
    if (!itemNumber) return { error: ":x:  **|  That's not something you can view**" };
    if (itemNumber < 1) return { error: ":x:  **|  That item number is invalid**" };

    // Get item
    let itemResult: HomeRepo | undefined;
    if (itemType === "w") itemResult = data.watchedRepos[itemNumber - 1];
    else if (itemType === "s") itemResult = data.starredRepos[itemNumber - 1];

    if (!itemResult) return { error: ":x:  **|  That item number is invalid**" };

    // Run module
    if (itemType === "w") return {
        module: () => repo(userRequest, itemResult?.ownerName || "", itemResult?.name || ""),
        url: repoURL(itemResult.ownerName, itemResult.name)
    };
    else if (itemType === "s") return {
        module: () => repo(userRequest, itemResult?.ownerName || "", itemResult?.name || ""),
        url: repoURL(itemResult.ownerName, itemResult.name)
    };
}