import Embed from "../../classes/Embed/Embed";

export default function helpEmbed(prefix: string): Embed {

    // Return
    return new Embed()
        .setAuthor("Spotify", "https://i.imgur.com/tiqno7l.png")
        .setDescription("[Login with Spotify](https://eutenly.com/login/spotify)")
        .setColor(0x1ed760)
        .addField("Search Spotify", `Use the \`${prefix}spotify <Search Query>\` command to search Spotify and get information about tracks (songs), artists, albums, playlists, and podcast episodes`)
        .addField("View Current Track", `Use the \`${prefix}spotify current\` command to share what you're listening to`)
        .addField("Control Spotify", `Use the \`${prefix}spotify play\`, \`${prefix}spotify pause\`, and \`${prefix}spotify skip\` commands to control what you're listening to`)
        .addField("Top Tracks and Artists", `Use the \`${prefix}spotify top tracks\` and \`${prefix}spotify top artists\` commands to view your top tracks and artists`)
        .addField("Ready to Try It?", "[Login with Spotify](https://eutenly.com/login/spotify)")
        .setBranding();
}