import Message from "../../../classes/Message/Message";
import video from "../video/main";
import { YouTubeSearchResult } from "./parse";

export default function view(data: YouTubeSearchResult[], message: Message) {

    // Get params
    const input: string = message.content.split(" ").slice(1).join(" ");
    if (!input) return message.channel.sendMessage(":x:  **|  Which result would you like to view?**");

    // Get result number
    const resultNumber: number = parseInt(input);
    if ((!resultNumber) || (resultNumber < 1)) return message.channel.sendMessage(":x:  **|  That result number is invalid**");

    // Get result
    const result: YouTubeSearchResult = data[resultNumber - 1];
    if (!result) return message.channel.sendMessage(":x:  **|  That result number is invalid**");

    // View video
    video(message, result.id);
}