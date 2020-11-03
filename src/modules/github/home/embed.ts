import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import truncateString from "../../../util/truncateString";
import { GitHubHome, GitHubNotification, GitHubRepo } from "./parse";

export default function embed(command: Command, data?: GitHubHome): Embed {

    // Get prefix
    const prefix: string = command.message.channel.prefix;

    // Parse type
    const parseType = (type: string): string | undefined => {
        if (type === "assign") return "Issue Assigned";
        else if (type === "author") return "Comment on Your Thread";
        else if (type === "comment") return "Comment";
        else if (type === "invitation") return "Repo Invitation";
        else if (type === "manual") return "Activity on Subscribed Issue";
        else if (type === "mention") return "Mention";
        else if (type === "review_requested") return "Review Requested";
        else if (type === "security_alert") return "Security Alert";
        else if (type === "state_change") return "Issue State Change";
        else if (type === "subscribed") return "Subscribed Repo";
        else if (type === "team_mention") return "Team Mention";
    };

    // Embed
    if (!data) return new Embed();

    const watchedRepos: GitHubRepo[] = command.compactMode ? data.watchedRepos.slice(0, 3) : data.watchedRepos;
    const starredRepos: GitHubRepo[] = command.compactMode ? data.starredRepos.slice(0, 3) : data.starredRepos;
    const notifications: GitHubNotification[] = command.compactMode ? data.notifications.slice(0, 3) : data.notifications;

    const embed = new Embed()
        .setAuthor("GitHub", "https://getdrawings.com/free-icon-bw/github-icon-23.png")
        .setColor(0x000000)
        .addField("Your Watched Repos", `${watchedRepos.map((r: GitHubRepo, i: number) => `**w-${i + 1}. [${r.ownerName}/${r.name}](https://github.com/${r.ownerName}/${r.name})**\n${r.description ? truncateString(r.description, 50) : ""}`).join("\n")}\n\n\u2022 Use \`${prefix}view <Repo Number>\` to view a repo\n\u2022 Use \`${prefix}view watched repos\` to view more of your watched repos\n\u200b`)
        .addField("Your Starred Repos", `${starredRepos.map((r: GitHubRepo, i: number) => `**s-${i + 1}. [${r.ownerName}/${r.name}](https://github.com/${r.ownerName}/${r.name})**\n${r.description ? truncateString(r.description, 50) : ""}`).join("\n")}\n\n\u2022 Use \`${prefix}view <Repo Number>\` to view a repo\n\u2022 Use \`${prefix}view starred repos\` to view more of your starred repos\n\u200b`)
        .addField("Your Notifications", `${notifications.map((n: GitHubNotification, i: number) => `**${i + 1}. [${n.repoOwnerName}/${n.repoName}](https://github.com/${n.repoOwnerName}/${n.repoName})** - ${parseType(n.type)}`).join("\n")}`)
        .setBranding();

    // Return
    return embed;
}