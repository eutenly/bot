import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import parseDuration from "../../../util/parseDuration";
import { SearchOverviewResult } from "../types";

export default function embed(command: Command, data?: SearchOverviewResult[]): Embed {

    // Get prefix
    const prefix: string = command.message.channel.prefix;

    // Embed
    const embed = new Embed()
        .setAuthor(`Spotify Search: ${command.metadata?.query}`, "https://i.imgur.com/tiqno7l.png")
        .setColor(0x1ed760)
        .setBranding();

    // No data
    if (!data) return embed
        .setDescription("Your search didn't match any results")
        .setColor(0xf44242);

    // Build embed
    data.forEach((d: SearchOverviewResult, i: number) => {

        /**
         * Track
         *
         * **1. [In Your Arms (with X Ambassadors)](https://open.spotify.com/track/70YPzqSEwJvAIQ6nMs1cjY)**
         * [ILLENIUM](https://open.spotify.com/artist/45eNHdiiabvmbp4erw26rg) - 3:41
         */
        if (d.type === "track") embed.addField(null, `**${i + 1}. [${d.name}](https://open.spotify.com/track/${d.id})**\n[${d.artist.name}](https://open.spotify.com/artist/${d.artist.id}) - ${parseDuration(d.length || 0)}`);

        /**
         * Artist
         *
         * **1. [ILLENIUM](https://open.spotify.com/artist/45eNHdiiabvmbp4erw26rg)**
         * 910,840 Followers
         */
        else if (d.type === "artist") embed.addField(null, `**${i + 1}. [${d.name}](https://open.spotify.com/artist/${d.id})**\n${d.followers?.toLocaleString()} Follower${d.followers === 1 ? "" : "s"}`);

        /**
         * Album
         *
         * **1. [ASCEND](https://open.spotify.com/album/60xcVwuQJAOyu11xf9mObS)**
         * [ILLENIUM](https://open.spotify.com/artist/45eNHdiiabvmbp4erw26rg) - 17 Tracks
         */
        else if (d.type === "album") embed.addField(null, `**${i + 1}. [${d.name}](https://open.spotify.com/album/${d.id})**\n[${d.artist.name}](https://open.spotify.com/artist/${d.artist.id}) - ${d.tracks?.toLocaleString()} Track${d.tracks === 1 ? "" : "s"}`);
    });

    if (command.compactMode) embed.addField("More", `\u2022 Use the \`${prefix}view <Result Number>\` command to get more info about a result\n\u2022 Use the \`${prefix}view tracks/artists/albums/playlists/episodes\` command to see more results`);
    else embed
        .addField()
        .addField("View", `Use the \`${prefix}view <Result Number>\` command to get more info about a result`)
        .addField("More", `**\u2022 Tracks:** \`${prefix}view tracks\`\n**\u2022 Artists:** \`${prefix}view artists\`\n**\u2022 Albums:** \`${prefix}view albums\`\n**\u2022 Playlists:** \`${prefix}view playlists\`\n**\u2022 Episodes:** \`${prefix}view episodes\``)
        .addField();

    // Return
    return embed;
}