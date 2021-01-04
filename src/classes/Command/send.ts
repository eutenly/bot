import Embed from "../Embed/Embed";
import Message from "../Message/Message";
import Command from "./Command";

export default async function send(command: Command, embed: Embed) {

    // Edit
    if (command.responseMessage) {
        await command.responseMessage.edit(embed);
        command.debug("Edited response message", { embed });
        return;
    }

    // Send
    const m: Message = await command.userRequest.respond(embed);

    // Debug
    command.debug("Sent response message", { embed, messageID: m.id });

    // Set data
    m.command = command;
    command.responseMessage = m;

    // Arrow reactions
    if (command.pageManager) {
        await m.addReaction(`left_arrow:${command.client.eutenlyEmojis.get("left_arrow")}`);
        await m.addReaction(`right_arrow:${command.client.eutenlyEmojis.get("right_arrow")}`);
    }

    // Custom reactions
    if ((command.reactions) && (!command.noData)) for (let reaction of command.reactions) await m.addReaction(`${reaction.emoji}:${command.client.eutenlyEmojis.get(reaction.emoji)}`);

    // Compact mode reaction
    await m.addReaction(command.compactMode ? `expand:${command.client.eutenlyEmojis.get("expand")}` : `compact:${command.client.eutenlyEmojis.get("compact")}`);
}