import Embed from "../Embed/Embed";
import Message from "../Message/Message";
import Command from "./Command";

export default async function send(command: Command, embed: Embed): Promise<void> {

    // Edit
    if (command.responseMessage) return await command.responseMessage.edit(embed);

    // Send
    const m: Message = await command.message.channel.sendMessage(embed);

    // Set data
    m.command = command;
    command.responseMessage = m;

    // React
    if (command.searchManager) {
        await m.addReaction(`left_arrow:${command.client.eutenlyEmojis.get("left_arrow")}`);
        await m.addReaction(`right_arrow:${command.client.eutenlyEmojis.get("right_arrow")}`);
    }
}