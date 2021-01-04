import { URL } from "url";
import Message from "../../classes/Message/Message";
import UserRequest from "../../classes/UserRequest/UserRequest";
import { LinkCheckerModule } from "../website/website/main";
import twitterHome from "./home/main";
import twitterSearch from "./search/main";
import searchLastMessage from "./searchLastMessage";
import twitterTimeline from "./timeline/main";
import twitterTweet from "./tweet/main";
import twitterUser from "./user/main";

export default function linkChecker(input: string, linksOnly?: boolean): LinkCheckerModule | undefined {

    // Create url
    let inputURL: string = input;
    if ((!inputURL.startsWith("http://")) && (!inputURL.startsWith("https://"))) inputURL = `http://${inputURL}`;
    let url: URL = new URL("https://this_variable_needs_to_be_defined");
    try { url = new URL(inputURL); } catch { }

    // Regexes
    const HOSTNAME_REGEX: RegExp = /^(www\.)?twitter\.com$/;

    if (HOSTNAME_REGEX.test(url.hostname)) {

        // Check if input is a tweet link
        const tweet = url.pathname.match(/\/(.+)\/status\/(.+)/);
        if (tweet) return (userRequest: UserRequest) => twitterTweet(userRequest, tweet[2], tweet[1]);

        // Check if input is a search link
        if ((url.pathname === "/search") && (url.searchParams.get("q"))) return (userRequest: UserRequest) => twitterSearch(userRequest, url.searchParams.get("q") as string);

        // Check if input is a user link
        const user = url.pathname.match(/\/(.+)/);
        if (user) return (userRequest: UserRequest) => twitterUser(userRequest, user[1], "username");

        // Check if input is home
        if (url.pathname === "/") return (userRequest: UserRequest) => twitterHome(userRequest);
    }

    if (!linksOnly) {

        // Check if input is a user @
        const username = input.match(/@(.+)/);
        if (username) return (userRequest: UserRequest) => twitterUser(userRequest, username[1], "username");

        // Check if input is timeline
        if (input.toLowerCase().replace(/\s+/g, "") === "timeline") return (userRequest: UserRequest) => twitterTimeline(userRequest, "home");

        // Check if input is to search last message
        if (input === "^") return (userRequest: UserRequest) => searchLastMessage(userRequest);
    }
}