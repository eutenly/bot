import Message from "../classes/Message/Message";

export default async function reactionConfirmations(message: Message) {

    // Get params
    const input: string = message.commandContent.split(" ").slice(1).join(" ");

    // Define inputs
    const inputs: string[] = ["enabled", "enable", "disabled", "disable", "on", "off", "yes", "no", "y", "n", "true", "false"];

    // Invalid input
    if (!inputs.includes(input)) return message.channel.sendMessage(":x:  **|  Please enter if you'd like reaction confirmation messages to be enabled or disabled**");

    // Parse input
    const enabled: boolean = ["enabled", "enable", "on", "yes", "y", "true"].includes(input);

    // Set reaction confirmations
    message.author.setReactionConfirmations(enabled);

    // Send
    message.channel.sendMessage(`:white_check_mark:  **|  Reaction confirmation messages are now ${enabled ? "enabled" : "disabled"}**`);
}