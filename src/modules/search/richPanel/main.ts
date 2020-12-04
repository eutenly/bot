import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import Message from "../../../classes/Message/Message";
import embed from "./embed";
import view from "./view";

export default async function main(message: Message, data: any, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Create command
    const command: Command = new Command(message.client, {
        name: "richPanel",
        category: "search",
        message,
        data,
        getEmbed: embed,
        view
    }, (m: Message, chIndex: number) => main(m, data, chIndex), commandHistoryIndex);

    // Get embed
    const commandEmbed: Embed = command.getEmbed(command, command.data);

    // Send
    command.send(commandEmbed);

    // Return
    return command;
}