import Message from "../classes/Message/Message";

export default async function debug(message: Message) {

    // Get params
    const input: string = message.commandContent.split(" ").slice(1).join(" ");

    // Define inputs
    const inputs: string[] = ["enabled", "enable", "disabled", "disable", "on", "off", "yes", "no", "y", "n", "true", "false"];

    // Invalid input
    if (!inputs.includes(input)) return message.channel.sendMessage(":x:  **|  Please enter if you'd like debug mode to be enabled or disabled**");

    // Parse input
    const enabled: boolean = ["enabled", "enable", "on", "yes", "y", "true"].includes(input);

    // Set debug mode
    message.author.debugMode = enabled;
    if (!message.author.debugMode) delete message.author.debugMode;

    // Send
    message.channel.sendMessage(`:white_check_mark:  **|  Debug mode is now ${enabled ? "enabled" : "disabled"}**`);
}