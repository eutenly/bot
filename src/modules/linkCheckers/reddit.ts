import Message from "../../classes/Message/Message";
import redditFeed from "../reddit/feed/main";
import redditHome from "../reddit/home/main";
import redditPost from "../reddit/post/main";
import redditPosts from "../reddit/posts/main";
import redditSearch from "../reddit/search/main";
import searchLastMessage from "../reddit/searchLastMessage";
import redditSubreddit from "../reddit/subreddit/main";
import redditUser from "../reddit/user/main";
import { LinkCheckerModule } from "../website/website/main";

export default function reddit(input: string, linksOnly?: boolean): LinkCheckerModule | undefined {

    // Check if input is a post
    const post = input.match(/reddit\.com\/r\/(.+)\/comments\/(.+)/);
    if (post) return (message: Message) => redditPost(message, post[2].split("/")[0], post[1]);

    // Check if input is subreddit posts
    const posts = input.match(/reddit\.com\/(r|u|user)\/(.+)(\/hot|\?sort=new)/);
    if (posts) return (message: Message) => redditPosts(message, posts[2].split("/")[0], posts[1] === "r" ? "subreddit" : "user");

    // Check if input is a subreddit
    const subreddit = input.match(/reddit\.com\/r\/(.+)/);
    if (subreddit) return (message: Message) => redditSubreddit(message, subreddit[1]);

    // Check if input is a user
    const user = input.match(/reddit\.com\/(u|user)\/(.+)/);
    if (user) return (message: Message) => redditUser(message, user[2]);

    // Check if input is a search link
    const search = input.match(/reddit\.com\/search\?q=(.+)/);
    if (search) return (message: Message) => redditSearch(message, search[1]);

    // Check if input is home
    if (/reddit\.com/.test(input)) return (message: Message) => redditHome(message);

    if (!linksOnly) {

        // Check if input is an r/subreddit
        const subredditName = input.match(/u\/(.+)/);
        if (subredditName) return (message: Message) => redditUser(message, subredditName[1]);

        // Check if input is a u/user
        const username = input.match(/r\/(.+)/);
        if (username) return (message: Message) => redditSubreddit(message, username[1]);

        // Check if input is feed
        if (input.toLowerCase().replace(/\s+/g, "") === "feed") return (message: Message) => redditFeed(message);

        // Check if input is to search last message
        if (input === "^") return (message: Message) => searchLastMessage(message);
    }
}