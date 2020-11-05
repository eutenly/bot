import Message from "../../classes/Message/Message";
import { LinkCheckerModule } from "../website/website/main";
import youtubeChannel from "../youtube/channel/main";
import youtubePlaylist from "../youtube/playlist/main";
import youtubeVideo from "../youtube/video/main";
import youtubeVideos from "../youtube/videos/main";

export default function youtube(input: string): LinkCheckerModule | undefined {

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
}