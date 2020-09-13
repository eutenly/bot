import Command from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import setHeaders from "../setHeaders";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(message: Message, ownerName: string, name: string, commandHistoryIndex?: number) {

    // Create command
    const command: Command = new Command(message.client, {
        name: "githubReleases",
        message,
        input: name,
        metadata: {
            ownerName,
            name
        },
        getURL: (input: string = "", page: number = 1): string => `https://api.github.com/repos/${encodeURIComponent(ownerName)}/${encodeURIComponent(name)}/releases?per_page=5${page ? `&page=${page}` : ""}`,
        connectionName: "github",
        setHeaders,
        parser: parse,
        getEmbed: embed,
        view
    }, (m: Message, chIndex: number) => main(m, ownerName, name, chIndex), commandHistoryIndex);
    await command.uninitializedConnection;

    // No connection
    if (command.noConnection) return;

    // Search
    command.searchManager?.setPage(1);
}