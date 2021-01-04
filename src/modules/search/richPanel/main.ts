import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import UserRequest from "../../../classes/UserRequest/UserRequest";
import embed from "./embed";
import view from "./view";

export default async function main(userRequest: UserRequest, data: any, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Create command
    const command: Command = new Command(userRequest.client, {
        name: "richPanel",
        category: "search",
        userRequest,
        data,
        getEmbed: embed,
        view
    }, (r: UserRequest, chIndex: number) => main(r, data, chIndex), commandHistoryIndex);

    // Get embed
    const commandEmbed: Embed = command.getEmbed(command, command.data);

    // Send
    command.send(commandEmbed);

    // Return
    return command;
}