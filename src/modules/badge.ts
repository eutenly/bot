import Message from "../classes/Message/Message";
import { Users } from "../models";

export default async function badge(message: Message) {

    // Get params
    const PARAMS: string[] = message.commandContent.split(" ").slice(1);

    let target: string | undefined;
    let type: string | undefined;
    let input: string | undefined;
    PARAMS.forEach((p: string) => {
        if ((["suggester", "bughunter"].includes(p.toLowerCase())) && (!type)) type = p.toLowerCase();
        else if ((["add", "remove", "yes", "no", "y", "n"].includes(p.toLowerCase())) && (!input)) input = p.toLowerCase();
        else if (!target) target = p.replace(/[<>@!]/g, "");
    });

    // Invalid params
    if (!target) return message.channel.sendMessage(":x:  **|  Which user would you like to modify a badge for?**");
    if (!type) return message.channel.sendMessage(":x:  **|  Which badge would you like to modify?**");

    // Parse type
    type = type === "suggester" ? "suggester" : "bugHunter";

    // Parse input
    if (!input) input = "add";
    const action: string = ["add", "yes", "y"].includes(input) ? "add" : "remove";

    // Update database
    const updated = await Users.findByIdAndUpdate(target, action === "add" ? { [type]: true } : { $unset: { [type]: 1 } });

    // No user
    if (!updated) return message.channel.sendMessage(":x:  **|  I couldn't find that user**");

    // Send
    message.channel.sendMessage(`:white_check_mark:  **|  The ${type === "suggester" ? "Suggester" : "Bug Hunter"} badge has been ${action === "add" ? "added to" : "removed from"} <@${target}>**`);
}