import Command from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import fetch from "../fetch";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(message: Message, user: string, type: string = "repos", commandHistoryIndex?: number) {

    // Create command
    const command: Command = new Command(message.client, {
        name: "githubRepos",
        message,
        input: user,
        metadata: {
            type
        },
        getURL: (user: string = "", page: number = 1): string => `https://api.github.com/users/${encodeURIComponent(user)}/${type}?per_page=5${page ? `&page=${page}` : ""}`,
        connectionName: "github",
        fetch,
        parser: parse,
        getEmbed: embed,
        view
    }, (m: Message, chIndex: number) => main(m, user, type, chIndex), commandHistoryIndex);
    await command.uninitializedConnection;

    // No connection
    if (command.noConnection) return;

    // Search
    command.searchManager?.setPage(1);
}

export function url(user: string): string {

    return `https://github.com/${user}?tab=repositories`;
}