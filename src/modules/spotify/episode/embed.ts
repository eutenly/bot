import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import parseDuration from "../../../util/parseDuration";
import truncateString from "../../../util/truncateString";
import { SpotifyEpisode } from "./parse";

export default function embed(command: Command, data?: SpotifyEpisode): Embed {

    // Get prefix
    const prefix: string = command.message.guild?.prefix || process.env.DEFAULT_PREFIX || "";

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
        .setAuthor(data.name, "https://i.imgur.com/tiqno7l.png", `https://open.spotify.com/episode/${data.id}`)
        .setDescription(command.compactMode ? truncateString(data.description, 250) : truncateString(data.description, 500))
        .addField(null, null, true)
        .addField("Link", `[spotify.com...](https://open.spotify.com/episode/${data.id})`, true)
        .addField(null, null, true);

    if (command.compactMode) embed
        .addField(null, `**Show:** ${data.show}\n**Length:** ${parseDuration(data.length)}\n**Explicit:** ${data.explicit ? "Yes" : "No"}`)
        .setThumbnail(data.image);

    else embed
        .addField("Explicit", data.explicit ? "Yes" : "No", true)
        .addField("Show", data.show, true)
        .addField("Length", parseDuration(data.length), true)
        .setImage(data.image);

    embed.addField("Add This Episode", `Use the \`${prefix}add <Playlist>\` command to add this episode to a playlist`);

    if (data.copyrights.length) embed.addField(null, data.copyrights.join("\n"));

    // Return
    return embed;
}