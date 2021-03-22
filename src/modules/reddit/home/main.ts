import Command, { ViewDataURL } from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import UserRequest from "../../../classes/UserRequest/UserRequest";
import fetch from "../fetch";
import helpEmbed from "../helpEmbed";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(userRequest: UserRequest, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Create command
    const command: Command = new Command(userRequest.client, {
        name: "home",
        category: "reddit",
        userRequest,
        url: url(),
        getData: "https://oauth.reddit.com/api/v1/me",
        getExtraData: [
            (data: any): string => `https://oauth.reddit.com/user/${data.name}/submitted?raw_json=1&limit=5`,
            "https://oauth.reddit.com/best?raw_json=1&limit=5"
        ],
        connectionName: "reddit",
        helpEmbed,
        fetch,
        parser: parse,
        getEmbed: embed,
        view
    }, (r: UserRequest, chIndex: number) => main(r, chIndex), commandHistoryIndex);
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

export function url(): ViewDataURL {

    return "https://reddit.com";
}