import Command from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import album from "../album/main";
import artist from "../artist/main";
import episode from "../episode/main";
import playlist from "../playlist/main";
import track from "../track/main";
import { SpotifySearchResult } from "./parse";

export default function view(data: SpotifySearchResult[], message: Message, command: Command) {

    // Get params
    const input: string = message.content.split(" ").slice(1).join(" ");
    if (!input) return message.channel.sendMessage(":x:  **|  Which result would you like to view?**");

    // Get result number
    const resultNumber: number = parseInt(input);
    if ((!resultNumber) || (resultNumber < 1)) return message.channel.sendMessage(":x:  **|  That result number is invalid**");

    // Get result
    const result: SpotifySearchResult = data[resultNumber - 1];
    if (!result) return message.channel.sendMessage(":x:  **|  That result number is invalid**");

    // Run module
    if (command.metadata.type === "track") track(message, result.id);
    else if (command.metadata.type === "artist") artist(message, result.id);
    else if (command.metadata.type === "album") album(message, result.id);
    else if (command.metadata.type === "playlist") playlist(message, result.id);
    else if (command.metadata.type === "episode") episode(message, result.id);
}