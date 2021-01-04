import { CommandHistoryEntry } from "../classes/User/User";
import UserRequest from "../classes/UserRequest/UserRequest";

export default async function move(userRequest: UserRequest, type: "back" | "forward") {

    // Get latest command
    const latestCommand: CommandHistoryEntry | undefined = userRequest.user.commandHistory.find((h: CommandHistoryEntry) => h.latest);
    if (!latestCommand) return userRequest.respond(":x:  **|  You haven't used any commands recently**");

    // Get command
    const latestCommandIndex: number = userRequest.user.commandHistory.indexOf(latestCommand);
    const commandHistoryIndex: number = latestCommandIndex + (type === "back" ? -1 : 1);

    const command: CommandHistoryEntry | undefined = userRequest.user.commandHistory[commandHistoryIndex];
    if (!command) return userRequest.respond(`:x:  **|  Use another command to be able to use the ${type} command**`);

    // Run command
    command.run(userRequest, commandHistoryIndex);
}