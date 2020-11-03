import Command from "../../classes/Command/Command";
import Message from "../../classes/Message/Message";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(message: Message, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Get params
    let page: number = parseInt(message.commandContent.split(" ").slice(1).join(" ")) || 1;
    if (page < 1) page = 1;

    // Get user data
    const userData = await message.author.getData();

    // Create command
    const command: Command = new Command(message.client, {
        name: "view",
        type: "savedLinks",
        message,
        input: "links",
        allData: userData?.savedLinks,
        splitPages: 5,
        parser: parse,
        getEmbed: embed,
        view
    }, (m: Message, chIndex: number) => main(m, chIndex), commandHistoryIndex);

    // Search
    command.searchManager?.setPage(page);

    // Return
    return command;
}