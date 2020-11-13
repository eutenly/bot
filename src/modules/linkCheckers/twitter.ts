import Message from "../../classes/Message/Message";
import twitterHome from "../twitter/home/main";
import twitterSearch from "../twitter/search/main";
import searchLastMessage from "../twitter/searchLastMessage";
import twitterTimeline from "../twitter/timeline/main";
import twitterTweet from "../twitter/tweet/main";
import twitterUser from "../twitter/user/main";
import { LinkCheckerModule } from "../website/website/main";

export default function twitter(input: string, linksOnly?: boolean): LinkCheckerModule | undefined {

    // Check if input is a tweet link
    const tweet = input.match(/twitter\.com\/(.+)\/status\/(.+)/);
    if (tweet) return (message: Message) => twitterTweet(message, tweet[2], tweet[1]);

    // Check if input is a user link
    const user = input.match(/twitter\.com\/(.+)/);
    if (user) return (message: Message) => twitterUser(message, user[1], "username");

    // Check if input is a search link
    const search = input.match(/twitter\.com\/search\?q=(.+)/);
    if (search) return (message: Message) => twitterSearch(message, search[1]);

    // Check if input is home
    if (/twitter\.com/.test(input)) return (message: Message) => twitterHome(message);

    if (!linksOnly) {

        // Check if input is a user @
        const username = input.match(/@(.+)/);
        if (username) return (message: Message) => twitterUser(message, username[1], "username");

        // Check if input is timeline
        if (input.toLowerCase().replace(/\s+/g, "") === "timeline") return (message: Message) => twitterTimeline(message, "home");

        // Check if input is to search last message
        if (input === "^") return (message: Message) => searchLastMessage(message);
    }
}