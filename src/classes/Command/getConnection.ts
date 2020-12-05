import sendLoginEmbed from "../../util/sendLoginEmbed";
import Command from "./Command";

export default function getConnection(command: Command) {
    command.uninitializedConnection = new Promise<void>(async (resolve) => {

        // Get connection
        if (!command.connectionName) return resolve();
        await command.message.author.getConnection(command.connectionName);

        // Connection found
        if (command.message.author.connections[command.connectionName]) {
            command.debug("Found connection");
            return resolve();
        }

        // Send embed
        if (command.helpEmbed) command.message.channel.sendMessage(command.helpEmbed);
        else sendLoginEmbed(command.message.author, command.message.channel, command.connectionName);

        // Set no connection
        command.noConnection = true;

        // Debug
        command.debug("No connection found");

        // Resolve
        resolve();
    });
}