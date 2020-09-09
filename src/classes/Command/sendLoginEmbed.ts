import Embed from "../Embed/Embed";
import Command from "./Command";

export default async function sendLoginEmbed(command: Command): Promise<void> {

    // Remove from connections
    delete command.message.author.connections[command.connectionName || ""];

    // Get name
    let connectionName: string | undefined;
    if (command.connectionName === "twitter") connectionName = "Twitter";
    else if (command.connectionName === "github") connectionName = "GitHub";
    else if (command.connectionName === "spotify") connectionName = "Spotify";

    // Get color
    let color: number | undefined;
    if (command.connectionName === "twitter") color = 0x1da1f2;
    else if (command.connectionName === "github") color = 0x000000;
    else if (command.connectionName === "spotify") color = 0x1ed760;

    // Embed
    const embed = new Embed()
        .setTitle(`Login with ${connectionName}`)
        .setDescription(`To use ${connectionName} integration, [login with ${connectionName}](https://eutenly.com/login/${command.connectionName})`)
        .setColor(color);

    // Send
    await command.message.channel.sendMessage(embed);
}