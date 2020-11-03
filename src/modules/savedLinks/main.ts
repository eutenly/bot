import Command from "../../classes/Command/Command";
import Message from "../../classes/Message/Message";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(message: Message, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Create command
    const command: Command = new Command(message.client, {
        name: "view",
        type: "savedLinks",
        message,
        input: "links",
        getData: async (input?: string, page: number = 1): Promise<any> => {

            // All data is returned at once
            if (page > 1) return;

            // Get user data
            const userData = await message.author.getData();
            if (!userData) return;

            // Return saved links
            return userData.savedLinks;
        },
        splitPages: 5,
        parser: parse,
        getEmbed: embed,
        view
    }, (m: Message, chIndex: number) => main(m, chIndex), commandHistoryIndex);

    // Search
    command.searchManager?.setPage(1);

    // Return
    return command;
}