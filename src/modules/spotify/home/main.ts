import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import Message from "../../../classes/Message/Message";
import fetch from "../fetch";
import helpEmbed from "../helpEmbed";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(message: Message, commandHistoryIndex?: number) {

    // Get prefix
    const prefix: string = message.guild?.prefix || process.env.DEFAULT_PREFIX || "";

    // Create command
    const command: Command = new Command(message.client, {
        name: "spotifyHome",
        message,
        url: url(),
        getURL: (): string => "https://api.spotify.com/v1/me/playlists?limit=5",
        getExtraData: [
            (): string => "https://api.spotify.com/v1/me/top/tracks?limit=5",
            (): string => "https://api.spotify.com/v1/me/top/artists?limit=5",
            (): string => "https://api.spotify.com/v1/me/player/recently-played?limit=5"
        ],
        connectionName: "spotify",
        helpEmbed: helpEmbed(prefix),
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