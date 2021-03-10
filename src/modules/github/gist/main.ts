import Command, { ViewDataURL } from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import UserRequest from "../../../classes/UserRequest/UserRequest";
import fetch from "../fetch";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(userRequest: UserRequest, name: string, gistID: number, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Create command
    const command: Command = new Command(userRequest.client, {
        name: "gist",
        category: "github",
        userRequest,
        metadata: {
            name
        },
        url: url(name, gistID),
        getData: `https://api.github.com/gists/${encodeURIComponent(gistID)}`,
        connectionName: "github",
        fetch,
        parser: parse,
        getEmbed: embed,
        view
    }, (r: UserRequest, chIndex: number) => main(r, name, gistID, chIndex), commandHistoryIndex);
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

export function url(name: string, gistID: number): ViewDataURL {

    return `https://gist.github.com/${name}/${gistID}`;
}