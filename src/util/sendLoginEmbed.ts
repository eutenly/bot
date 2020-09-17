import Embed from "../classes/Embed/Embed";
import Message from "../classes/Message/Message";

export default async function sendLoginEmbed(message: Message, connectionName: string): Promise<void> {

    // Remove from connections
    delete message.author.connections[connectionName];

    // Get name
    let name: string | undefined;
    if (connectionName === "twitter") name = "Twitter";
    else if (connectionName === "github") name = "GitHub";
    else if (connectionName === "spotify") name = "Spotify";

    // Get color
    let color: number | undefined;
    if (connectionName === "twitter") color = 0x1da1f2;
    else if (connectionName === "github") color = 0x000000;
    else if (connectionName === "spotify") color = 0x1ed760;

    // Embed
    const embed = new Embed()
        .setTitle(`Login with ${name}`)
        .setDescription(`To use ${name} integration, [login with ${name}](https://eutenly.com/login/${connectionName})`)
        .setColor(color);

    // Send
    await message.channel.sendMessage(embed);
}