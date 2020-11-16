import Command, { ViewDataURL } from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import Message from "../../../classes/Message/Message";
import fetch from "../fetch";
import play from "../play";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(message: Message, playlistID: string, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Create command
    const command: Command = new Command(message.client, {
        name: "playlist",
        category: "spotify",
        message,
        url: url(playlistID),
        getData: `https://api.spotify.com/v1/playlists/${encodeURIComponent(playlistID)}`,
        connectionName: "spotify",
        fetch,
        parser: parse,
        getEmbed: embed,
        view,
        reactions: [{
            emoji: "spotify_play",
            module: play
        }]
    }, (m: Message, chIndex: number) => main(m, playlistID, chIndex), commandHistoryIndex);
    await command.uninitializedConnection;

    // No connection
    if (command.noConnection) return;

    // Fetch
    await command.fetchData();

    // Get embed
    const commandEmbed: Embed = command.getEmbed(command, command.data);

    // Send
    command.send(commandEmbed);

    // Return
    return command;
}

export function url(playlistID: string): ViewDataURL {

    return `https://open.spotify.com/playlist/${playlistID}`;
}