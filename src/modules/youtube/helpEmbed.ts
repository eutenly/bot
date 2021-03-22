import Embed from "../../classes/Embed/Embed";

export default new Embed()
    .setAuthor("YouTube", "https://i0.wp.com/www.vectorico.com/wp-content/uploads/2018/02/youtube-red-square.png")
    .setColor(0xff0000)
    .addField("Search YouTube", `Use the \`/youtube\` command to search for YouTube videos, channels, and playlists`)
    .addField("View Detailed Information", "View more info about a video, channel, or playlist to get detailed information")
    .addField("View a Channel's Videos", `When viewing a channel, use the \`/view result: videos\` command to view that channel's videos`)
    .addField("Ready to Try It?", `Search for something with the \`/youtube\` command`)
    .setBranding();