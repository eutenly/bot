import Command, { ViewDataURL } from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import UserRequest from "../../../classes/UserRequest/UserRequest";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(userRequest: UserRequest, playlistID: string, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Create command
    const command: Command = new Command(userRequest.client, {
        name: "playlist",
        category: "youtube",
        userRequest,
        url: url(playlistID),
        getData: async (): Promise<any> => await userRequest.client.youtube.playlists.list({
            part: ["snippet", "contentDetails"],
            id: [playlistID],
            access_token: userRequest.user.connections["youtube"]?.accessToken
        }),
        connectionName: "youtube",
        parser: parse,
        getEmbed: embed,
        view
    }, (r: UserRequest, chIndex: number) => main(r, playlistID, chIndex), commandHistoryIndex);

    // Fetch
    await command.fetchData();
    if (command.data === null) return;

    // Get embed
    const commandEmbed: Embed = command.getEmbed(command, command.data);

    // Send
    command.send(commandEmbed);

    // Return
    return command;
}

export function url(playlistID: string): ViewDataURL {

    return `https://youtube.com/playlist?list=${playlistID}`;
}