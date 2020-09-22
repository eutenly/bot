import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import Message from "../../../classes/Message/Message";
import fetch from "../fetch";
import embed from "./embed";
import parse from "./parse";

export default async function main(message: Message, title: string, commandHistoryIndex?: number) {

    // Create command
    const command: Command = new Command(message.client, {
        name: "wikipediaArticle",
        message,
        getURL: (): string => `https://en.wikipedia.org/w/api.php?action=parse&format=json&page=${encodeURIComponent(title)}&redirects=true`,
        fetch,
        parser: parse,
        getEmbed: embed
    }, (m: Message, chIndex: number) => main(m, title, chIndex), commandHistoryIndex);

    // Fetch
    await command.fetchData();

    // Get embed
    const commandEmbed: Embed = command.getEmbed(command, command.data);

    // Send
    command.send(commandEmbed);
}