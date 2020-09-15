import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import Message from "../../../classes/Message/Message";
import refreshToken from "../refreshToken";
import setHeaders from "../setHeaders";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(message: Message, trackID: string, commandHistoryIndex?: number) {

    // Create command
    const command: Command = new Command(message.client, {
        name: "spotifyTrack",
        message,
        getURL: (): string => `https://api.spotify.com/v1/tracks/${encodeURIComponent(trackID)}`,
        getExtraData: [
            (data: any): string => `https://api.spotify.com/v1/audio-features/${data.id}`,
            (data: any): string => `https://api.spotify.com/v1/albums/${data.album.id}`
        ],
        connectionName: "spotify",
        setHeaders,
        refreshToken,
        parser: parse,
        getEmbed: embed,
        view
    }, (m: Message, chIndex: number) => main(m, trackID, chIndex), commandHistoryIndex);
    await command.uninitializedConnection;

    // No connection
    if (command.noConnection) return;

    // Fetch
    await command.fetch();

    // Get embed
    const commandEmbed: Embed = command.getEmbed(command, command.data);

    // Send
    command.send(commandEmbed);
}