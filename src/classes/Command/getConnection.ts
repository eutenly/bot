import sendLoginEmbed from "../../util/sendLoginEmbed";
import Command from "./Command";

export default function getConnection(command: Command): void {
    command.uninitializedConnection = new Promise(async (resolve) => {

        // Get connection
        if (!command.connectionName) return resolve();
        await command.message.author.getConnection(command.connectionName);

        // Connection found
        if (command.message.author.connections[command.connectionName]) return resolve();

        // Send embed
        if (command.homeEmbed) command.message.channel.sendMessage(command.homeEmbed);
        else sendLoginEmbed(command.message, command.connectionName);

        // Set no connection
        command.noConnection = true;

        // Resolve
        resolve();
    });
}