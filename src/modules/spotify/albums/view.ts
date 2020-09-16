import Message from "../../../classes/Message/Message";
import album from "../album/main";
import { SpotifyAlbum } from "./parse";

export default function view(data: SpotifyAlbum[], message: Message) {

    // Get params
    const input: string = message.content.split(" ").slice(1).join(" ");
    if (!input) return message.channel.sendMessage(":x:  **|  Which result would you like to view?**");

    // Get result number
    const resultNumber: number = parseInt(input);
    if ((!resultNumber) || (resultNumber < 1)) return message.channel.sendMessage(":x:  **|  That result number is invalid**");

    // Get result
    const result: SpotifyAlbum = data[resultNumber - 1];
    if (!result) return message.channel.sendMessage(":x:  **|  That result number is invalid**");

    // View album
    album(message, result.id);
}