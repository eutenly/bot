import Command from "./Command";

export default function getConnection(command: Command): void {
    command.uninitializedConnection = new Promise(async (resolve) => {

        // No need to get connection
        if ((!command.connectionName) || (command.message.author.connections[command.connectionName])) return resolve();

        // Get connection
        await command.message.author.getConnection(command.connectionName);

        // Connection found
        if (command.message.author.connections[command.connectionName]) return resolve();

        // Send login embed
        command.sendLoginEmbed();

        // Set no connection
        command.noConnection = true;

        // Resolve
        resolve();
    });
}