import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import truncateString from "../../../util/truncateString";
import { Home, HomeNotification, HomeRepo } from "../types";

export default function embed(command: Command, data?: Home): Embed {

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

    const watchedRepos: HomeRepo[] = command.compactMode ? data.watchedRepos.slice(0, 3) : data.watchedRepos;
    const starredRepos: HomeRepo[] = command.compactMode ? data.starredRepos.slice(0, 3) : data.starredRepos;
    const notifications: HomeNotification[] = command.compactMode ? data.notifications.slice(0, 3) : data.notifications;

    const embed = new Embed()
        .setAuthor("GitHub", "https://i.imgur.com/FwnDNtd.png")
        .setColor(0x000000)
        .addField("Your Watched Repos", `${watchedRepos.map((r: HomeRepo, i: number) => `**w-${i + 1}. [${r.ownerName}/${r.name}](https://github.com/${r.ownerName}/${r.name})**\n${r.description ? truncateString(r.description, 50) : ""}`).join("\n")}\n\n\u2022 Use \`${prefix}view <Repo Number>\` to view a repo\n\u2022 Use \`${prefix}view watched repos\` to view more of your watched repos\n\u200b`)
        .addField("Your Starred Repos", `${starredRepos.map((r: HomeRepo, i: number) => `**s-${i + 1}. [${r.ownerName}/${r.name}](https://github.com/${r.ownerName}/${r.name})**\n${r.description ? truncateString(r.description, 50) : ""}`).join("\n")}\n\n\u2022 Use \`${prefix}view <Repo Number>\` to view a repo\n\u2022 Use \`${prefix}view starred repos\` to view more of your starred repos\n\u200b`)
        .addField("Your Notifications", `${notifications.map((n: HomeNotification, i: number) => `**${i + 1}. [${n.repoOwnerName}/${n.repoName}](https://github.com/${n.repoOwnerName}/${n.repoName})** - ${parseType(n.type)}`).join("\n")}`)
        .setBranding();

    // Return
    return embed;
}