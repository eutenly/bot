import Command from "../../../../classes/Command/Command";
import Embed from "../../../../classes/Embed/Embed";
import Message from "../../../../classes/Message/Message";
import embed from "./embed";

export default async function main(message: Message, data: any, commandHistoryIndex?: number) {

    // Create command
    const command: Command = new Command(message.client, {
        name: "googleLyrics",
        message,
        data,
        getEmbed: embed
    }, (m: Message, chIndex: number) => main(m, data, chIndex), commandHistoryIndex);

    // Get embed
    const commandEmbed: Embed = command.getEmbed(command, command.data);

    // Send
    command.send(commandEmbed);
}