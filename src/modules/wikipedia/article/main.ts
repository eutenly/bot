import Command, { ViewDataURL } from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import Message from "../../../classes/Message/Message";
import fetch from "../fetch";
import embed from "./embed";
import parse from "./parse";

export default async function main(message: Message, title: string, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Create command
    const command: Command = new Command(message.client, {
        name: "article",
        category: "wikipedia",
        message,
        url: url(title),
        getData: `https://en.wikipedia.org/w/api.php?action=parse&format=json&page=${encodeURIComponent(title)}&redirects=true`,
        fetch,
        parser: parse,
        getEmbed: embed
    }, (m: Message, chIndex: number) => main(m, title, chIndex), commandHistoryIndex);

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

export function url(title: string): ViewDataURL {

    return `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`;
}