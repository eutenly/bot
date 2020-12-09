import { URL } from "url";
import Message from "../../classes/Message/Message";
import { LinkCheckerModule } from "../website/website/main";
import youtubeChannel from "./channel/main";
import youtubePlaylist from "./playlist/main";
import youtubeSearch from "./search/main";
import searchLastMessage from "./searchLastMessage";
import youtubeVideo from "./video/main";
import youtubeVideos from "./videos/main";

export default function linkChecker(input: string, linksOnly?: boolean): LinkCheckerModule | undefined {

    // Create url
    let inputURL: string = input;
    if ((!inputURL.startsWith("http://")) && (!inputURL.startsWith("https://"))) inputURL = `http://${inputURL}`;
    let url: URL = new URL("https://this_variable_needs_to_be_defined");
    try { url = new URL(inputURL); } catch { }

    // Regexes
    const HOSTNAME_REGEX: RegExp = /^(www\.)?(m\.)?youtube\.com$/;
    const SHORTLINK_HOSTNAME_REGEX: RegExp = /^(www\.)?youtu\.be$/;

    // Check if input is a video link
    if (
        (
            HOSTNAME_REGEX.test(url.hostname) &&
            url.pathname === "/watch" &&
            url.searchParams.get("v")
        ) ||
        (
            SHORTLINK_HOSTNAME_REGEX.test(url.hostname) &&
            url.pathname !== "/"
        )
    ) return (message: Message) => youtubeVideo(message, HOSTNAME_REGEX.test(url.hostname) ? (url.searchParams.get("v") as string) : url.pathname.substring(1));

    if (HOSTNAME_REGEX.test(url.hostname)) {

        // Check if input is a videos link
        const videos = url.pathname.match(/\/channel\/(.+)\/videos/);
        if (videos) return (message: Message) => youtubeVideos(message, videos[1]);

        // Check if input is a channel link
        const channel = url.pathname.match(/\/channel\/(.+)/);
        if (channel) return (message: Message) => youtubeChannel(message, channel[1]);

        // Check if input is a playlist link
        if ((url.pathname === "/playlist") && (url.searchParams.get("list"))) return (message: Message) => youtubePlaylist(message, url.searchParams.get("list") as string);

        // Check if input is a search link
        if ((url.pathname === "/results") && (url.searchParams.get("search_query"))) return (message: Message) => youtubeSearch(message, url.searchParams.get("search_query") as string);
    }

    if (!linksOnly) {

        // Check if input is to search last message
        if (input === "^") return (message: Message) => searchLastMessage(message);
    }
}