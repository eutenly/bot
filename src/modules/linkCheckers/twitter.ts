import Message from "../../classes/Message/Message";
import twitterTweet from "../twitter/tweet/main";
import twitterUser from "../twitter/user/main";

export default function twitter(input: string, linksOnly?: boolean): Function | undefined {

    // Check if input is a tweet link
    const tweet = input.match(/twitter\.com\/(.+)\/status\/(.+)/);
    if (tweet) return (message: Message) => twitterTweet(message, tweet[2]);

    // Check if input is a user link
    const user = input.match(/twitter\.com\/(.+)/);
    if (user) return (message: Message) => twitterUser(message, user[1], "username");

    if (!linksOnly) {

        // Check if input is a user @
        const username = input.match(/@(.+)/);
        if (username) return (message: Message) => twitterUser(message, username[1], "username");
    }
}