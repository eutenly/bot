import Command, { ViewDataURL } from "../../../classes/Command/Command";
import UserRequest from "../../../classes/UserRequest/UserRequest";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(userRequest: UserRequest, query: string, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Create command
    const command: Command = new Command(userRequest.client, {
        name: "search",
        category: "youtube",
        userRequest,
        input: query,
        url: url(query),
        orderedPages: true,
        getData: async (query?: string, page?: number, nextPageToken?: string): Promise<any> => await userRequest.client.youtube.search.list({
            part: ["snippet"],
            q: query,
            pageToken: nextPageToken,
            access_token: userRequest.user.connections["youtube"]?.accessToken
        }),
        connectionName: "youtube",
        perPage: 5,
        parser: parse,
        getEmbed: embed,
        view
    }, (r: UserRequest, chIndex: number) => main(r, query, chIndex), commandHistoryIndex);

    // Search
    await command.pageManager?.setPage(1);

    // Return
    return command;
}

export function url(query: string): ViewDataURL {

    return `https://youtube.com/results?search_query=${encodeURIComponent(query)}`;
}