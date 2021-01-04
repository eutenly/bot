import Command, { ViewDataURL } from "../../../classes/Command/Command";
import UserRequest from "../../../classes/UserRequest/UserRequest";
import fetch from "../fetch";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(userRequest: UserRequest, ownerName: string, name: string, path?: string, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Create command
    const command: Command = new Command(userRequest.client, {
        name: "files",
        category: "github",
        userRequest,
        input: name,
        metadata: {
            ownerName,
            name,
            path
        },
        url: url(ownerName, name, path),
        getData: (input: string = ""): string => `https://api.github.com/repos/${encodeURIComponent(ownerName)}/${encodeURIComponent(name)}/contents${path ? `/${path}` : ""}`,
        connectionName: "github",
        fetch,
        perPage: 15,
        parser: parse,
        getEmbed: embed,
        view
    }, (r: UserRequest, chIndex: number) => main(r, ownerName, name, path, chIndex), commandHistoryIndex);
    await command.uninitializedConnection;

    // No connection
    if (command.noConnection) return;

    // Search
    command.pageManager?.setPage(1);

    // Return
    return command;
}

export function url(ownerName: string, name: string, path?: string): ViewDataURL {

    return `https://github.com/${ownerName}/${name}/tree/master${path ? `/${path}` : ""}`;
}