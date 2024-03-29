import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import truncateString from "../../../util/truncateString";
import { Home, HomeNotification, HomeRepo } from "../types";

export default function embed(command: Command, data?: Home): Embed {

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
    command.noData = !data;
    if (!data) return new Embed();

    const watchedRepos: HomeRepo[] = command.compactMode ? data.watchedRepos.slice(0, 3) : data.watchedRepos;
    const starredRepos: HomeRepo[] = command.compactMode ? data.starredRepos.slice(0, 3) : data.starredRepos;
    const notifications: HomeNotification[] = command.compactMode ? data.notifications.slice(0, 3) : data.notifications;

    const embed = new Embed()
        .setAuthor("GitHub", "https://i.imgur.com/FwnDNtd.png")
        .setColor(0x000000)
        .addField("Your Watched Repos", watchedRepos.length ? `${watchedRepos.map((r: HomeRepo, i: number) => `**w-${i + 1}. ${((r.private) && (command.userRequest.channel.guild)) ? "*Private*" : `[${r.ownerName}/${r.name}](https://github.com/${r.ownerName}/${r.name})**\n${r.description ? truncateString(r.description, 50) : ""}`}`).join("\n")}\n\n\u2022 Use \`/view\` to view a repo\n\u2022 Use \`/view result: watched repos\` to view more of your watched repos\n\u200b` : "You don't have any watched repos")
        .addField("Your Starred Repos", starredRepos.length ? `${starredRepos.map((r: HomeRepo, i: number) => `**s-${i + 1}. ${((r.private) && (command.userRequest.channel.guild)) ? "*Private*" : `[${r.ownerName}/${r.name}](https://github.com/${r.ownerName}/${r.name})**\n${r.description ? truncateString(r.description, 50) : ""}`}`).join("\n")}\n\n\u2022 Use \`/view\` to view a repo\n\u2022 Use \`/view result: starred repos\` to view more of your starred repos\n\u200b` : "You don't have any starred repos")
        .addField("Your Notifications", notifications.length ? `${notifications.map((n: HomeNotification, i: number) => `**${i + 1}. [${n.repoOwnerName}/${n.repoName}](https://github.com/${n.repoOwnerName}/${n.repoName})** - ${parseType(n.type)}`).join("\n")}` : "You don't have any notifications")
        .setBranding();

    // Return
    return embed;
}