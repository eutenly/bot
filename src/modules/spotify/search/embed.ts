import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import parseDuration from "../../../util/parseDuration";
import truncateString from "../../../util/truncateString";
import { SearchResult } from "../types";

export default function embed(command: Command, data: SearchResult[]): Embed {

    // Get prefix
    const prefix: string = command.userRequest.channel.prefix;

    // Embed
    const embed = new Embed()
        .setAuthor(`Spotify Search: ${command.pageManager?.input}`, "https://i.imgur.com/tiqno7l.png")
        .setDescription(`${command.metadata?.type.charAt(0).toUpperCase()}${command.metadata?.type.substring(1)}s: Page ${command.pageManager?.page}`)
        .setColor(0x1ed760)
        .setBranding();

    // No data
    command.noData = data.length === 0;
    if (data.length === 0) return embed
        .setDescription("Your search didn't match any results")
        .setColor(0xf44242);

    // Build embed

    /**
     * Track
     *
     * **1. [In Your Arms (with X Ambassadors)](https://open.spotify.com/track/70YPzqSEwJvAIQ6nMs1cjY)**
     * [ILLENIUM](https://open.spotify.com/artist/45eNHdiiabvmbp4erw26rg) - 3:41
     */
    if (command.metadata?.type === "track") data.forEach((d: SearchResult, i: number) => embed.addField(null, `**${i + 1}. [${d.name}](https://open.spotify.com/track/${d.id})**\n[${d.artist?.name}](https://open.spotify.com/artist/${d.artist?.id}) - ${parseDuration(d.length || 0)}`));

    /**
     * Artist
     *
     * **1. [ILLENIUM](https://open.spotify.com/artist/45eNHdiiabvmbp4erw26rg)**
     * 910,840 Followers
     */
    else if (command.metadata?.type === "artist") data.forEach((d: SearchResult, i: number) => embed.addField(null, `**${i + 1}. [${d.name}](https://open.spotify.com/artist/${d.id})**\n${d.followers?.toLocaleString()} Follower${d.followers === 1 ? "" : "s"}`));

    /**
     * Album
     *
     * **1. [ASCEND](https://open.spotify.com/album/60xcVwuQJAOyu11xf9mObS)**
     * [ILLENIUM](https://open.spotify.com/artist/45eNHdiiabvmbp4erw26rg) - 17 Tracks
     */
    else if (command.metadata?.type === "album") data.forEach((d: SearchResult, i: number) => embed.addField(null, `**${i + 1}. [${d.name}](https://open.spotify.com/album/${d.id})**\n[${d.artist?.name}](https://open.spotify.com/artist/${d.artist?.id}) - ${d.tracks?.toLocaleString()} Track${d.tracks === 1 ? "" : "s"}`));

    /**
     * Playlist
     *
     * **1. [Illenium Mix](https://open.spotify.com/playlist/4uD1UNqevGZoOOW4UbOuQ8)**
     * Like illenium? You'll love this
     * [V6 Music](https://open.spotify.com/user/20mc3a9w582vc7a7o5cjm03d8) - 151 Tracks
     */
    else if (command.metadata?.type === "playlist") data.forEach((d: SearchResult, i: number) => embed.addField(null, `**${i + 1}. [${d.name}](https://open.spotify.com/playlist/${d.id})**\n${d.description ? `${truncateString(d.description, 200)}\n` : ""}[${d.owner?.name}](https://open.spotify.com/user/${d.owner?.id}) - ${d.tracks?.toLocaleString()} Track${d.tracks === 1 ? "" : "s"}`));

    /**
     * Episode
     *
     * **1. [Introducing: Waveform with Marques Brownlee](https://open.spotify.com/episode/6fhCTjRotCIE8NxCmoZKJs)**
     * Waveform with Marques Brownlee, coming soon! From the mind of Marques Brownlee, better known as MKBHD, comes Waveform...
     * 0:49
     */
    else if (command.metadata?.type === "episode") data.forEach((d: SearchResult, i: number) => embed.addField(null, `**${i + 1}. [${d.name}](https://open.spotify.com/artist/${d.id})**\n${d.description?.substring(0, 200)}\n${parseDuration(d.length || 0)}`));

    if (command.compactMode) embed.addField(null, `*\u2022 React or use the \`${prefix}next\` and \`${prefix}previous\` commands to cycle through pages\n\u2022 Use the \`${prefix}view <Result Number>\` command to get more info about a result*`);
    else embed
        .addField()
        .addField("Navigation", `\u2022 Use the reactions to cycle through pages\n\u2022 Alternatively, you can use the \`${prefix}next\` and \`${prefix}previous\` commands\n\u2022 Use the \`${prefix}view <Result Number>\` command to get more info about a result\n\u2022 *Navigation for this search times out in 3 minutes*`)
        .addField();

    // Return
    return embed;
}