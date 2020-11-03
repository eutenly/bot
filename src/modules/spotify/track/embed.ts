import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import parseDuration from "../../../util/parseDuration";
import { SpotifyArtist, SpotifyTrack } from "./parse";

export default function embed(command: Command, data?: SpotifyTrack): Embed {

    // Get prefix
    const prefix: string = command.message.channel.prefix;

    // Embed
    const embed = new Embed()
        .setAuthor("Spotify Search", "https://i.imgur.com/tiqno7l.png")
        .setColor(0x1ed760)
        .setBranding();

    // No data
    if (!data) return embed
        .setDescription("Your search didn't match any results")
        .setColor(0xf44242);

    // Build embed
    embed
        .setAuthor(data.name, "https://i.imgur.com/tiqno7l.png", `https://open.spotify.com/track/${data.id}`)
        .setDescription(`${data.artists.map((a: SpotifyArtist, i: number) => `${data.artists.length > 1 ? `**[a-${i + 1}]** ` : ""}[${a.name}](https://open.spotify.com/artist/${a.id})`).join("\n")}${data.artists.length > 1 ? "\n\n" : " "}(\`${prefix}view ${data.artists.length > 1 ? "<Artist Number>" : "artist"}\`)`)
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

    if (data.copyrights.length) embed.addField(null, data.copyrights.join("\n"));

    // Return
    return embed;
}