import Embed from "../../classes/Embed/Embed";

export default new Embed()
    .setAuthor("Spotify", "https://i.imgur.com/tiqno7l.png")
    .setDescription("[Login with Spotify](https://eutenly.com/login/spotify)")
    .setColor(0x1ed760)
    .addField("Search Spotify", `Use the \`/spotify\` command to search Spotify and get information about tracks (songs), artists, albums, playlists, and podcast episodes`)
    .addField("View Current Track", `Use the \`/spotify search-query: current\` command to share what you're listening to`)
    .addField("Control Spotify", `Use the \`/spotify search-query: play\`, \`/spotify search-query: pause\`, and \`/spotify search-query: skip\` commands to control what you're listening to`)
    .addField("Top Tracks and Artists", `Use the \`/spotify search-query: top tracks\` and \`/spotify search-query: top artists\` commands to view your top tracks and artists`)
    .addField("Ready to Try It?", "[Login with Spotify](https://eutenly.com/login/spotify)")
    .setBranding();