import Command from "../classes/Command/Command";
import Message from "../classes/Message/Message";

export default async function page(message: Message) {

    // Get prefix
    const prefix: string = message.guild?.prefix || process.env.DEFAULT_PREFIX || "";

    // Get params
    const PARAMS: string[] = message.content.split(" ");

    // The first param of the command is the type
    // ie. for `e;next [amount]` the type would be `next`
    const type: string = PARAMS[0].substring(prefix.length).toLowerCase();

    // The second param of the command is the amount
    const amount: number = parseInt(PARAMS.slice(1).join(" ")) || 1;

    // Get command
    const command: Command | undefined = message.client.userCommands.get(message.authorID);
    if (!command) return message.channel.sendMessage(":x:  **|  You haven't searched anything recently**");

    // Get page
    let page: number = command.searchManager.page || 1;
    if (type === "next") page = page + amount;
    else if (type === "previous") page = page - amount;
    else page = amount;

    // Set page
    command.searchManager.setPage(page);
}