import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import Message from "../../../classes/Message/Message";
import fetch from "../fetch";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(message: Message, commandHistoryIndex?: number) {

    // Get prefix
    const prefix: string = message.guild?.prefix || process.env.DEFAULT_PREFIX || "";

    // Home embed
    const homeEmbed: Embed = new Embed()
        .setAuthor("Spotify", "https://i.imgur.com/tiqno7l.png")
        .setDescription("[Login with Spotify](https://eutenly.com/login/spotify)")
        .setColor(0x1ed760)
        .addField("Search Spotify", `Use the \`${prefix}spotify <Search Query>\` command to search Spotify and get information about tracks (songs), artists, albums, playlists, and podcast episodes`)
        .addField("View Current Track", `Use the \`${prefix}spotify current\` command to share what you're listening to`)
        .addField("Control Spotify", `Use the \`${prefix}spotify play\`, \`${prefix}spotify pause\`, and \`${prefix}spotify skip\` commands to control what you're listening to`)
        .addField("Top Tracks and Artists", `Use the \`${prefix}spotify top tracks\` and \`${prefix}spotify top artists\` commands to view your top tracks and artists`)
        .addField("Ready to Try It?", "[Login with Spotify](https://eutenly.com/login/spotify)")
        .setBranding();

    // Create command
    const command: Command = new Command(message.client, {
        name: "spotifyHome",
        message,
        getURL: (): string => "https://api.spotify.com/v1/me/playlists?limit=5",
        getExtraData: [
            (): string => "https://api.spotify.com/v1/me/top/tracks?limit=5",
            (): string => "https://api.spotify.com/v1/me/top/artists?limit=5",
            (): string => "https://api.spotify.com/v1/me/player/recently-played?limit=5"
        ],
        connectionName: "spotify",
        homeEmbed,
        fetch,
        parser: parse,
        getEmbed: embed,
        view
    }, (m: Message, chIndex: number) => main(m, chIndex), commandHistoryIndex);
    await command.uninitializedConnection;

    // No connection
    if (command.noConnection) return;

    // Fetch
    await command.fetchData();

    // Get embed
    const commandEmbed: Embed = command.getEmbed(command, command.data);

    // Send
    command.send(commandEmbed);
}

export function url(): string {

    return "eutenly://spotify";
}