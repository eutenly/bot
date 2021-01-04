import Command, { ViewDataURL } from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import UserRequest from "../../../classes/UserRequest/UserRequest";
import fetch from "../fetch";
import starRepo from "../starRepo";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(userRequest: UserRequest, ownerName: string, name: string, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Create command
    const command: Command = new Command(userRequest.client, {
        name: "repo",
        category: "github",
        userRequest,
        url: url(ownerName, name),
        getData: `https://api.github.com/repos/${encodeURIComponent(ownerName)}/${encodeURIComponent(name)}`,
        connectionName: "github",
        fetch,
        parser: parse,
        getEmbed: embed,
        view,
        reactions: [{
            emoji: "github_star",
            module: starRepo
        }]
    }, (r: UserRequest, chIndex: number) => main(r, ownerName, name, chIndex), commandHistoryIndex);
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

export function url(ownerName: string, name: string): ViewDataURL {

    return `https://github.com/${ownerName}/${name}`;
}