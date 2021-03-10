import Command, { ViewDataURL } from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import UserRequest from "../../../classes/UserRequest/UserRequest";
import fetch from "../fetch";
import embed from "./embed";
import parse from "./parse";

export default async function main(userRequest: UserRequest, title: string, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Create command
    const command: Command = new Command(userRequest.client, {
        name: "article",
        category: "wikipedia",
        userRequest,
        url: url(title),
        getData: `https://en.wikipedia.org/w/api.php?action=parse&format=json&page=${encodeURIComponent(title)}&redirects=true`,
        fetch,
        parser: parse,
        getEmbed: embed
    }, (r: UserRequest, chIndex: number) => main(r, title, chIndex), commandHistoryIndex);

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

export function url(title: string): ViewDataURL {

    return `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`;
}