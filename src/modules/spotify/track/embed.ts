import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import parseDuration from "../../../util/parseDuration";
import { BasicUser, Track } from "../types";

export default function embed(command: Command, data?: Track): Embed {

    // Get prefix
    const prefix: string = command.message.channel.prefix;

    // Embed
    const embed = new Embed()
        .setAuthor("Spotify Track", "https://i.imgur.com/tiqno7l.png")
        .setColor(0x1ed760)
        .setBranding();

    // No data
    command.noData = !data;
    if (!data) return embed
        .setDescription("Unknown track")
        .setColor(0xf44242);

    // Build embed
    embed
        .setAuthor(data.name, "https://i.imgur.com/tiqno7l.png", `https://open.spotify.com/track/${data.id}`)
        .setDescription(`${data.artists.map((a: BasicUser, i: number) => `${data.artists.length > 1 ? `**[a-${i + 1}]** ` : ""}[${a.name}](https://open.spotify.com/artist/${a.id})`).join("\n")}${data.artists.length > 1 ? "\n\n" : " "}(\`${prefix}view ${data.artists.length > 1 ? "<Artist Number>" : "artist"}\`)`)
        .addField(null, null, true)
        .addField("Link", `[spotify.com...](https://open.spotify.com/track/${data.id})`, true)
        .addField(null, null, true);

    if (command.compactMode) embed
        .addField(null, `**Length:** ${parseDuration(data.length)}\n**Release Year:** ${(new Date(data.releasedOn)).getFullYear()}\n**Album:** ${data.album.name} (\`${prefix}view album\`)\n**Explicit:** ${data.explicit ? "Yes" : "No"}\n**Tempo:** ${data.tempo} BPM\n**Energy:** ${data.energy}%\n**Danceability:** ${data.danceability}%`)
        .setThumbnail(data.albumArt);

    else embed
        .addField("Explicit", data.explicit ? "Yes" : "No", true)
        .addField("Album", `${data.album.name}\n(\`${prefix}view album\`)`, true)
        .addField("Length", parseDuration(data.length), true)
        .addField("Energy", `${data.energy}%`, true)
        .addField("Tempo", `${data.tempo} BPM`, true)
        .addField("Danceability", `${data.danceability}%`, true)
        .addField(null, null, true)
        .addField("Release Year", (new Date(data.releasedOn)).getFullYear(), true)
        .addField(null, null, true)
        .setImage(data.albumArt);

    embed.addField("Add This Track", `Use the \`${prefix}add <Playlist>\` command to add this track to a playlist`);

    // Progress
    if (data.progress) {

        // Get progress percent data
        const progressPercent: number = data.progress / data.length;
        const fillAmount: number = Math.floor(progressPercent * 20);

        // Add field
        embed.addField("Progress", `${parseDuration(data.progress)} [${"█".repeat(fillAmount)}${"-".repeat(20 - fillAmount)}] ${parseDuration(data.length)}`);
    }

    if (data.copyrights.length) embed.addField(null, data.copyrights.join("\n"));

    // Return
    return embed;
}