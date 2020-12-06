import Command, { ViewData } from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import pr, { url as prURL } from "../pr/main";
import { ListedPR } from "../types";

export default function view(data: ListedPR[], message: Message, command: Command): ViewData | undefined {

    // Get params
    const input: string = message.commandContent.split(" ").slice(1).join(" ");
    if (!input) return { error: ":x:  **|  Which result would you like to view?**" };

    // Get result number
    const resultNumber: number = parseInt(input);
    if ((!resultNumber) || (resultNumber < 1)) return { error: ":x:  **|  That result number is invalid**" };

    // Get result
    const result: ListedPR = data[resultNumber - 1];
    if (!result) return { error: ":x:  **|  That result number is invalid**" };

    // View pr
    return {
        module: () => pr(message, command.metadata.ownerName, command.metadata.name, result.number),
        url: prURL(command.metadata.ownerName, command.metadata.name, result.number)
    };
}