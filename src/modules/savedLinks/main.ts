import Command from "../../classes/Command/Command";
import Message from "../../classes/Message/Message";
import { SavedLink } from "../../models/users";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(message: Message, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Get params
    const PARAMS: string[] = message.commandContent.split(" ").slice(1);
    let query: string | undefined = PARAMS[0]?.toLowerCase();
    let pageInput: string | undefined = PARAMS[1];

    // Swap parameters
    if ((!parseInt(pageInput)) && (parseInt(query))) {
        query = PARAMS[1]?.toLowerCase();
        pageInput = PARAMS[0];
    }

    // Parse page
    const page: number = parseInt(pageInput) || 1;

    // Get user data
    const userData = await message.author.getData();

    // Get saved links
    let savedLinks: SavedLink[] = userData?.savedLinks || [];

    // Filter saved links
    savedLinks = savedLinks.filter((l: SavedLink) => l.url.includes(query || ""));

    // Create command
    const command: Command = new Command(message.client, {
        name: "view",
        category: "savedLinks",
        message,
        input: "links",
        getData: async (input: string = "", page: number = 1): Promise<any> => {
            const data: SavedLink[] = savedLinks.slice(page - 1, (page - 1) + 5);
            if (data.length) return data;
        },
        perPage: 5,
        parser: parse,
        getEmbed: embed,
        view
    }, (m: Message, chIndex: number) => main(m, chIndex), commandHistoryIndex);

    // Search
    command.pageManager?.setPage(page);

    // Return
    return command;
}