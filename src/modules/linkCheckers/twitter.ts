import Message from "../../classes/Message/Message";
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

    if (!linksOnly) {

        // Check if input is a user @
        const username = input.match(/@(.+)/);
        if (username) return (message: Message) => twitterUser(message, username[1], "username");

        // Check if input is timeline
        if (input.toLowerCase().replace(/\s+/g, "") === "timeline") return (message: Message) => twitterTimeline(message, "home");
    }
}