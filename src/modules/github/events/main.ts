import Command from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import fetch from "../fetch";
import embed from "./embed";
import parse from "./parse";

export default async function main(message: Message, name: string, type: string, commandHistoryIndex?: number) {

    // Create command
    const command: Command = new Command(message.client, {
        name: "githubEvents",
        message,
        input: name,
        getURL: (input: string = "", page: number = 1): string => `https://api.github.com/${type === "repo" ? `repos/${encodeURIComponent(name.split("/")[0])}/${encodeURIComponent(name.split("/")[1])}` : `users/${encodeURIComponent(name)}`}/events?per_page=5${page ? `&page=${page}` : ""}`,
        connectionName: "github",
        fetch,
        parser: parse,
        getEmbed: embed
    }, (m: Message, chIndex: number) => main(m, name, type, chIndex), commandHistoryIndex);
    await command.uninitializedConnection;

    // No connection
    if (command.noConnection) return;

    // Search
    command.searchManager?.setPage(1);
}