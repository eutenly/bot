import Command from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import fetch from "../fetch";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(message: Message, ownerName: string, name: string, path?: string, commandHistoryIndex?: number) {

    // Create command
    const command: Command = new Command(message.client, {
        name: "githubFiles",
        message,
        input: name,
        metadata: {
            ownerName,
            name,
            path
        },
        url: url(ownerName, name, path),
        getURL: (input: string = ""): string => `https://api.github.com/repos/${encodeURIComponent(ownerName)}/${encodeURIComponent(name)}/contents${path ? `/${path}` : ""}`,
        connectionName: "github",
        fetch,
        splitPages: 15,
        parser: parse,
        getEmbed: embed,
        view
    }, (m: Message, chIndex: number) => main(m, ownerName, name, path, chIndex), commandHistoryIndex);
    await command.uninitializedConnection;

    // No connection
    if (command.noConnection) return;

    // Search
    command.searchManager?.setPage(1);
}

export function url(ownerName: string, name: string, path?: string): string {

    return `https://github.com/${ownerName}/${name}/tree/master${path ? `/${path}` : ""}`;
}