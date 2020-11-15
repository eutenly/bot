import Command, { ViewDataURL } from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import fetch from "../fetch";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(message: Message, ownerName: string, name: string, path?: string, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Create command
    const command: Command = new Command(message.client, {
        name: "files",
        category: "github",
        message,
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
    }, (m: Message, chIndex: number) => main(m, ownerName, name, path, chIndex), commandHistoryIndex);
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