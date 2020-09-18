import Command from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import artist from "../artist/main";
import track from "../track/main";
import { SpotifyItem } from "./parse";

export default function view(data: SpotifyItem[], message: Message, command: Command) {

    // Get params
    const input: string = message.content.split(" ").slice(1).join(" ");
    if (!input) return message.channel.sendMessage(":x:  **|  Which result would you like to view?**");

    // Get result number
    const resultNumber: number = parseInt(input);
    if ((!resultNumber) || (resultNumber < 1)) return message.channel.sendMessage(":x:  **|  That result number is invalid**");

    // Get result
    const result: SpotifyItem = data[resultNumber - 1];
    if (!result) return message.channel.sendMessage(":x:  **|  That result number is invalid**");

    // Run module
    if (command.metadata.type === "tracks") track(message, result.id);
    else if (command.metadata.type === "artists") artist(message, result.id);
}