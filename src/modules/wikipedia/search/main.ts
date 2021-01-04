import Command, { ViewDataURL } from "../../../classes/Command/Command";
import UserRequest from "../../../classes/UserRequest/UserRequest";
import fetch from "../fetch";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(userRequest: UserRequest, query: string, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Create command
    const command: Command = new Command(userRequest.client, {
        name: "search",
        category: "wikipedia",
        userRequest,
        input: query,
        url: url(query),
        getData: (query: string = "", page: number = 1): string => `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&srlimit=5&sroffset=${(page - 1) * 5}`,
        fetch,
        perPage: 5,
        parser: parse,
        getEmbed: embed,
        view
    }, (r: UserRequest, chIndex: number) => main(r, query, chIndex), commandHistoryIndex);
    await command.uninitializedConnection;

    // No connection
    if (command.noConnection) return;

    // Search
    command.pageManager?.setPage(1);

    // Return
    return command;
}

export function url(query: string): ViewDataURL {

    return `https://en.wikipedia.org/w/index.php?search=${encodeURIComponent(query)}`;
}