import Command from "../classes/Command/Command";
import Message from "../classes/Message/Message";

export default async function page(message: Message) {

    // Get params
    const PARAMS: string[] = message.content.split(" ");

    // The first param of the command is the type
    // ie. for `e;next [amount]` the type would be `next`
    const type: string = PARAMS[0].substring(message.channel.prefix.length).toLowerCase();

    // The second param of the command is the amount
    const amount: number = parseInt(PARAMS.slice(1).join(" ")) || 1;

    // Get command
    const command: Command | undefined = message.author.command;
    if ((!command) || (!command.searchManager)) return message.channel.sendMessage(":x:  **|  You haven't searched anything recently**");

    // Get page
    let page: number = command.searchManager.page || 1;
    if (type === "next") page = page + amount;
    else if (type === "previous") page = page - amount;
    else page = amount;

    // Set page
    command.searchManager.setPage(page);
}