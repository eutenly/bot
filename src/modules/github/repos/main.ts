import Command, { ViewDataURL } from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import fetch from "../fetch";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(message: Message, user: string, type: string = "repos", commandHistoryIndex?: number): Promise<Command | undefined> {

    // Create command
    const command: Command = new Command(message.client, {
        name: "repos",
        category: "github",
        message,
        input: user,
        metadata: {
            type
        },
        url: url(user),
        getData: (user: string = "", page: number = 1): string => `https://api.github.com/users/${encodeURIComponent(user)}/${type}?per_page=5${page ? `&page=${page}` : ""}`,
        connectionName: "github",
        fetch,
        perPage: 5,
        parser: parse,
        getEmbed: embed,
        view
    }, (m: Message, chIndex: number) => main(m, user, type, chIndex), commandHistoryIndex);
    await command.uninitializedConnection;

    // No connection
    if (command.noConnection) return;

    // Search
    command.pageManager?.setPage(1);

    // Return
    return command;
}

export function url(user: string): ViewDataURL {

    return `https://github.com/${user}?tab=repositories`;
}