import Message from "../classes/Message/Message";
import { CommandHistoryEntry } from "../classes/User/User";

export default async function move(message: Message) {

    // Get the type, ie. `back` or `forward`
    const type: string = message.commandContent.toLowerCase();

    // Get latest command
    const latestCommand: CommandHistoryEntry | undefined = message.author.commandHistory.find((h: CommandHistoryEntry) => h.latest);
    if (!latestCommand) return message.channel.sendMessage(":x:  **|  You haven't used any commands recently**");

    // Get command
    const latestCommandIndex: number = message.author.commandHistory.indexOf(latestCommand);
    const commandHistoryIndex: number = latestCommandIndex + (type === "back" ? -1 : 1);

    const command: CommandHistoryEntry | undefined = message.author.commandHistory[commandHistoryIndex];
    if (!command) return message.channel.sendMessage(`:x:  **|  Use another command to be able to use the ${type === "back" ? "back" : "forward"} command**`);

    // Run command
    command.run(message, commandHistoryIndex);
}