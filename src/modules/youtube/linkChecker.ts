import Message from "../../classes/Message/Message";
import { LinkCheckerModule } from "../website/website/main";
import youtubeChannel from "./channel/main";
import youtubePlaylist from "./playlist/main";
import youtubeSearch from "./search/main";
import searchLastMessage from "./searchLastMessage";
import youtubeVideo from "./video/main";
import youtubeVideos from "./videos/main";

export default function linkChecker(input: string, linksOnly?: boolean): LinkCheckerModule | undefined {

    // Check if input is a video link
    const video = input.match(/(youtube\.com\/watch\?v=(.+))|(youtu\.be\/(.+))/);
    if (video) return (message: Message) => youtubeVideo(message, video[2] || video[4]);

    // Check if input is a channel link
    const channel = input.match(/youtube\.com\/channel\/(.+)/);
    if (channel) return (message: Message) => youtubeChannel(message, channel[1]);

    // Check if input is a playlist link
    const playlist = input.match(/youtube\.com\/playlist\?list=(.+)/);
    if (playlist) return (message: Message) => youtubePlaylist(message, playlist[1]);

    // Check if input is a videos link
    const videos = input.match(/youtube\.com\/channel\/(.+)\/videos/);
    if (videos) return (message: Message) => youtubeVideos(message, videos[1]);

    // Check if input is a search link
    const search = input.match(/youtube\.com\/results\?search_query=(.+)/);
    if (search) return (message: Message) => youtubeSearch(message, search[1]);

    if (!linksOnly) {

        // Check if input is to search last message
        if (input === "^") return (message: Message) => searchLastMessage(message);
    }
}