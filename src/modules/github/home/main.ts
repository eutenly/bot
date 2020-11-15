import Command, { ViewDataURL } from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import Message from "../../../classes/Message/Message";
import fetch from "../fetch";
import helpEmbed from "../helpEmbed";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(message: Message, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Create command
    const command: Command = new Command(message.client, {
        name: "home",
        category: "github",
        message,
        url: url(),
        getData: "https://api.github.com/user",
        getExtraData: [
            "https://api.github.com/user/subscriptions?per_page=5",
            "https://api.github.com/user/starred?per_page=5",
            `https://api.github.com/notifications?per_page=5`
        ],
        connectionName: "github",
        helpEmbed: helpEmbed(message.channel.prefix),
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

    // Return
    return command;
}

export function url(): ViewDataURL {

    return "https://github.com";
}