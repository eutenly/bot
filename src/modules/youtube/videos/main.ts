import Command, { ViewDataURL } from "../../../classes/Command/Command";
import UserRequest from "../../../classes/UserRequest/UserRequest";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(userRequest: UserRequest, channelID: string, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Create command
    const command: Command = new Command(userRequest.client, {
        name: "videos",
        category: "youtube",
        userRequest,
        input: channelID,
        url: url(channelID),
        orderedPages: true,
        getData: async (channelID?: string, page?: number, nextPageToken?: string): Promise<any> => await userRequest.client.youtube.search.list({
            part: ["snippet"],
            channelId: channelID,
            type: ["video"],
            order: "date",
            pageToken: nextPageToken,
            access_token: userRequest.user.connections["youtube"]?.accessToken
        }),
        connectionName: "youtube",
        perPage: 5,
        parser: parse,
        getEmbed: embed,
        view
    }, (r: UserRequest, chIndex: number) => main(r, channelID, chIndex), commandHistoryIndex);

    // Search
    await command.pageManager?.setPage(1);

    // Return
    return command;
}

export function url(channelID: string): ViewDataURL {

    return `https://youtube.com/channel/${channelID}/videos`;
}