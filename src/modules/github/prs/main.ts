import Command, { ViewDataURL } from "../../../classes/Command/Command";
import UserRequest from "../../../classes/UserRequest/UserRequest";
import fetch from "../fetch";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(userRequest: UserRequest, ownerName: string, name: string, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Create command
    const command: Command = new Command(userRequest.client, {
        name: "prs",
        category: "github",
        userRequest,
        input: name,
        metadata: {
            ownerName,
            name
        },
        url: url(ownerName, name),
        getData: (input: string = "", page: number = 1): string => `https://api.github.com/repos/${encodeURIComponent(ownerName)}/${encodeURIComponent(name)}/pulls?state=all&per_page=5${page ? `&page=${page}` : ""}`,
        connectionName: "github",
        fetch,
        perPage: 5,
        parser: parse,
        getEmbed: embed,
        view
    }, (r: UserRequest, chIndex: number) => main(r, ownerName, name, chIndex), commandHistoryIndex);
    await command.uninitializedConnection;

    // No connection
    if (command.noConnection) return;

    // Search
    command.pageManager?.setPage(1);

    // Return
    return command;
}

export function url(ownerName: string, name: string): ViewDataURL {

    return `https://github.com/${ownerName}/${name}/pulls`;
}