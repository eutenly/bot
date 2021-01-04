import Command, { ViewDataURL } from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import UserRequest from "../../../classes/UserRequest/UserRequest";
import fetch from "../fetch";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(userRequest: UserRequest, ownerName: string, name: string, prNumber: number, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Create command
    const command: Command = new Command(userRequest.client, {
        name: "pr",
        category: "github",
        userRequest,
        metadata: {
            ownerName,
            name
        },
        url: url(ownerName, name, prNumber),
        getData: `https://api.github.com/repos/${encodeURIComponent(ownerName)}/${encodeURIComponent(name)}/pulls/${encodeURIComponent(prNumber)}`,
        connectionName: "github",
        fetch,
        parser: parse,
        getEmbed: embed,
        view
    }, (r: UserRequest, chIndex: number) => main(r, ownerName, name, prNumber, chIndex), commandHistoryIndex);
    await command.uninitializedConnection;

    // No connection
    if (command.noConnection) return;

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

export function url(ownerName: string, name: string, prNumber: number): ViewDataURL {

    return `https://github.com/${ownerName}/${name}/pulls/${prNumber}`;
}