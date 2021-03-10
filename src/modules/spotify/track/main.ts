import Command, { ViewDataURL } from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import UserRequest from "../../../classes/UserRequest/UserRequest";
import fetch from "../fetch";
import play from "../play";
import queue from "../queue";
import save from "../save";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(userRequest: UserRequest, trackID: string, progress?: number, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Create command
    const command: Command = new Command(userRequest.client, {
        name: "track",
        category: "spotify",
        userRequest,
        metadata: {
            progress
        },
        url: url(trackID),
        getData: `https://api.spotify.com/v1/tracks/${encodeURIComponent(trackID)}`,
        getExtraData: [
            (data: any): string => `https://api.spotify.com/v1/audio-features/${data.id}`,
            (data: any): string => `https://api.spotify.com/v1/albums/${data.album.id}`
        ],
        connectionName: "spotify",
        fetch,
        parser: parse,
        getEmbed: embed,
        view,
        reactions: [
            {
                emoji: "spotify_queue",
                module: queue
            },
            {
                emoji: "spotify_play",
                module: play
            },
            {
                emoji: "spotify_save",
                module: save
            }
        ]
    }, (r: UserRequest, chIndex: number) => main(r, trackID, progress, chIndex), commandHistoryIndex);
    await command.uninitializedConnection;

    // No connection
    if (command.noConnection) return;

    // Fetch
    await command.fetchData();
    if (command.data === null) return;

    // Get embed
    const commandEmbed: Embed = command.getEmbed(command, command.data);

    // Send
    await command.send(commandEmbed);

    // Return
    return command;
}

export function url(trackID: string): ViewDataURL {

    return `https://open.spotify.com/track/${trackID}`;
}