import Message from "../../../classes/Message/Message";
import repo from "../repo/main";
import repos from "../repos/main";
import { GitHubHome, GitHubRepo } from "./parse";

export default function view(data: GitHubHome | undefined, message: Message) {

    // No data
    if (!data) return;

    // Get params
    const input: string = message.content.split(" ").slice(1).join(" ");
    if (!input) return message.channel.sendMessage(":x:  **|  What would you like to view?**");

    // Watched repos
    if (input.toLowerCase().replace(/\s+/g, "") === "watchedrepos") return repos(message, data.username, "subscriptions");

    // Starred repos
    else if (input.toLowerCase().replace(/\s+/g, "") === "starredrepos") return repos(message, data.username, "starred");

    // Get item type
    const itemType: string = input.split("-")[0].toLowerCase();
    if (!["w", "s"].includes(itemType)) return message.channel.sendMessage(":x:  **|  That's not something you can view**");

    // Get item number
    const itemNumber: number = parseInt(input.split("-").slice(1).join("-"));
    if (!itemNumber) return message.channel.sendMessage(":x:  **|  That's not something you can view**");
    if (itemNumber < 1) return message.channel.sendMessage(":x:  **|  That item number is invalid**");

    // Get item
    let itemResult: GitHubRepo | undefined;
    if (itemType === "w") itemResult = data.watchedRepos[itemNumber - 1];
    else if (itemType === "s") itemResult = data.starredRepos[itemNumber - 1];

    if (!itemResult) return message.channel.sendMessage(":x:  **|  That item number is invalid**");

    // Run module
    if (itemType === "w") repo(message, itemResult.ownerName, itemResult.name);
    else if (itemType === "s") repo(message, itemResult.ownerName, itemResult.name);
}