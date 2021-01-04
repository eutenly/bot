import sendLoginEmbed from "../../util/sendLoginEmbed";
import Command from "./Command";

export default function getConnection(command: Command) {
    command.uninitializedConnection = new Promise<void>(async (resolve) => {

        // Get connection
        if (!command.connectionName) return resolve();
        await command.userRequest.user.getConnection(command.connectionName);

        // Connection found
        if (command.userRequest.user.connections[command.connectionName]) {
            command.debug("Found connection");
            return resolve();
        }

        // Send embed
        if (command.helpEmbed) command.userRequest.respond(command.helpEmbed);
        else sendLoginEmbed(command.userRequest.user, command.userRequest, command.connectionName);

        // Set no connection
        command.noConnection = true;

        // Debug
        command.debug("No connection found");

        // Resolve
        resolve();
    });
}