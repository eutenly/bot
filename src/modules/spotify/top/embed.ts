import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import parseDuration from "../../../util/parseDuration";
import { TopItem } from "../types";

export default function embed(command: Command, data: TopItem[]): Embed {

    // Get prefix
    const prefix: string = command.message.channel.prefix;

    // Embed
    const embed = new Embed()
        .setAuthor(`Spotify: Your Top ${command.metadata?.type === "tracks" ? "Tracks" : "Artists"}`, "https://i.imgur.com/tiqno7l.png")
        .setDescription(`Page ${command.pageManager?.page}`)
        .setColor(0x1ed760)
        .setBranding();

    // No data
    if (data.length === 0) return embed
        .setDescription(`There aren't that many ${command.metadata?.type}`)
        .setColor(0xf44242);

    // Build embed
    if (command.metadata?.type === "tracks") data.forEach((d: TopItem, i: number) => embed.addField(null, `**${i + 1}. [${d.name}](https://open.spotify.com/track/${d.id})**\n[${d.artist?.name}](https://open.spotify.com/artist/${d.artist?.id}) - ${parseDuration(d.length || 0)}`));
    if (command.metadata?.type === "artists") data.forEach((d: TopItem, i: number) => embed.addField(null, `**${i + 1}. [${d.name}](https://open.spotify.com/artist/${d.id})**\n${d.followers?.toLocaleString()} Follower${d.followers === 1 ? "" : "s"}`));

    if (command.compactMode) embed.addField(null, `*\u2022 React or use the \`${prefix}next\` and \`${prefix}previous\` commands to cycle through pages\n\u2022 Use the \`${prefix}view <Result Number>\` command to get more info about a result*`);
    else embed
        .addField()
        .addField("Navigation", `\u2022 Use the reactions to cycle through pages\n\u2022 Alternatively, you can use the \`${prefix}next\` and \`${prefix}previous\` commands\n\u2022 Use the \`${prefix}view <Result Number>\` command to get more info about a result\n\u2022 *Navigation for this search times out in 3 minutes*`)
        .addField();

    // Return
    return embed;
}