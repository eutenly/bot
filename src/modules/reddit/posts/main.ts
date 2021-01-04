import Command, { ViewDataURL } from "../../../classes/Command/Command";
import UserRequest from "../../../classes/UserRequest/UserRequest";
import fetch from "../fetch";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(userRequest: UserRequest, name: string | null, type: string, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Get logged in user's username
    if (!name) {

        // Get connection
        await userRequest.user.getConnection("reddit");

        // Get user data
        const userData: any = await fetch(userRequest.user, userRequest, "https://oauth.reddit.com/api/v1/me");

        // Set name
        name = userData.name;
    }

    // Smh typescript
    name = name as string;

    // Create command
    const command: Command = new Command(userRequest.client, {
        name: "posts",
        category: "reddit",
        userRequest,
        input: name,
        url: url(name, type),
        orderedPages: true,
        getData: (name: string = "", page?: number, nextPageToken?: string): string => `https://oauth.reddit.com/${type === "subreddit" ? "r" : "user"}/${encodeURIComponent(name)}/${type === "subreddit" ? "hot" : (type === "saved" ? "saved" : "submitted")}?type=links&raw_json=1&limit=5${nextPageToken ? `&after=${nextPageToken}` : ""}`,
        connectionName: "reddit",
        fetch,
        perPage: 5,
        parser: parse,
        getEmbed: embed,
        view
    }, (r: UserRequest, chIndex: number) => main(r, name, type, chIndex), commandHistoryIndex);
    await command.uninitializedConnection;

    // No connection
    if (command.noConnection) return;

    // Search
    command.pageManager?.setPage(1);

    // Return
    return command;
}

export function url(name: string, type: string): ViewDataURL {

    return `https://reddit.com/${type === "subreddit" ? "r" : "u"}/${name}${type === "subreddit" ? "/hot" : (type === "saved" ? "/saved" : "?sort=new")}`;
}