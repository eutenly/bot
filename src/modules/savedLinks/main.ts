import Command from "../../classes/Command/Command";
import UserRequest from "../../classes/UserRequest/UserRequest";
import { SavedLink } from "../../models/users";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(userRequest: UserRequest, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Get params
    const query: string | undefined = userRequest.getParameter<string>("search-query")?.toLowerCase();
    const page: number | undefined = userRequest.getParameter<number>("page") || 1;

    // Get user data
    const userData = await userRequest.user.getData();

    // Get saved links
    let savedLinks: SavedLink[] = userData?.savedLinks || [];

    // Filter saved links
    savedLinks = savedLinks.filter((l: SavedLink) => l.url.includes(query || ""));

    // Create command
    const command: Command = new Command(userRequest.client, {
        name: "view",
        category: "savedLinks",
        userRequest,
        input: "links",
        getData: async (input: string = "", page: number = 1): Promise<any> => savedLinks.slice(page - 1, (page - 1) + 5),
        perPage: 5,
        parser: parse,
        getEmbed: embed,
        view
    }, (r: UserRequest, chIndex: number) => main(r, chIndex), commandHistoryIndex);

    // Search
    await command.pageManager?.setPage(page);

    // Return
    return command;
}