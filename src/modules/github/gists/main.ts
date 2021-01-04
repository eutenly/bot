import Command, { ViewDataURL } from "../../../classes/Command/Command";
import UserRequest from "../../../classes/UserRequest/UserRequest";
import fetch from "../fetch";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(userRequest: UserRequest, name: string, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Create command
    const command: Command = new Command(userRequest.client, {
        name: "gists",
        category: "github",
        userRequest,
        input: name,
        metadata: {
            name
        },
        url: url(name),
        getData: (input: string = "", page: number = 1): string => `https://api.github.com/users/${encodeURIComponent(name)}/gists?per_page=5${page ? `&page=${page}` : ""}`,
        connectionName: "github",
        fetch,
        perPage: 5,
        parser: parse,
        getEmbed: embed,
        view
    }, (r: UserRequest, chIndex: number) => main(r, name, chIndex), commandHistoryIndex);
    await command.uninitializedConnection;

    // No connection
    if (command.noConnection) return;

    // Search
    command.pageManager?.setPage(1);

    // Return
    return command;
}

export function url(name: string): ViewDataURL {

    return `https://gist.github.com/${name}`;
}