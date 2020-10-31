import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import { SpotifyAlbum, SpotifyArtist } from "./parse";

export default function embed(command: Command, data?: SpotifyArtist): Embed {

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
        .setAuthor(data.name, "https://i.imgur.com/tiqno7l.png", `https://open.spotify.com/artist/${data.id}`)
        .addField(null, null, true)
        .addField("Link", `[spotify.com...](https://open.spotify.com/artist/${data.id})`, true)
        .addField(null, null, true);

    if (command.compactMode) embed
        .addField(null, `**Followers:** ${data.followers.toLocaleString()}\n**Genres:** ${data.genres.join(", ")}`)
        .setThumbnail(data.avatar);

    else embed
        .addField(null, null, true)
        .addField("Followers", `${data.followers.toLocaleString()} Follower${data.followers === 1 ? "" : "s"}`, true)
        .addField(null, null, true)
        .setImage(data.avatar);

    embed.addField("Albums", `${data.albums.map((a: SpotifyAlbum, i: number) => `**a-${i + 1}.** [${a.name}](https://open.spotify.com/album/${a.id}) - ${a.tracks.toLocaleString()} Track${a.tracks === 1 ? "" : "s"}`).join("\n")}\n\n\u2022 Use \`${prefix}view <Album Number>\` to view an album\n\u2022 Use \`${prefix}view albums\` to view more albums`);

    if (!command.compactMode) embed.addField("Genres", data.genres.join(", "));

    // Return
    return embed;
}