import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import Message from "../../../classes/Message/Message";
import fetch from "../fetch";
import helpEmbed from "../helpEmbed";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(message: Message, commandHistoryIndex?: number) {

    // Get prefix
    const prefix: string = message.guild?.prefix || process.env.DEFAULT_PREFIX || "";

    // Create command
    const command: Command = new Command(message.client, {
        name: "githubHome",
        message,
        url: url(),
        getURL: (): string => "https://api.github.com/user",
        getExtraData: [
            (): string => "https://api.github.com/user/subscriptions?per_page=5",
            (): string => "https://api.github.com/user/starred?per_page=5",
            (): string => `https://api.github.com/notifications?per_page=5`
        ],
        connectionName: "github",
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
}

export function url(): string {

    return "eutenly://github";
}