import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import Message from "../../../classes/Message/Message";
import fetch from "../fetch";
import helpEmbed from "../helpEmbed";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(message: Message, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Get prefix
    const prefix: string = message.channel.prefix;

    // Create command
    const command: Command = new Command(message.client, {
        name: "home",
        type: "reddit",
        message,
        url: url(),
        getURL: (): string => "https://oauth.reddit.com/api/v1/me",
        getExtraData: [
            (data: any): string => `https://oauth.reddit.com/user/${data.name}/submitted?raw_json=1&limit=5`,
            (): string => "https://oauth.reddit.com/best?raw_json=1&limit=5"
        ],
        connectionName: "reddit",
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

    // Return
    return command;
}

export function url(): string {

    return "eutenly://reddit";
}