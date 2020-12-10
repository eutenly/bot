import Message from "../../classes/Message/Message";
import { LinkCheckerModule } from "../website/website/main";
import redditFeed from "./feed/main";
import redditHome from "./home/main";
import redditPost from "./post/main";
import redditPosts from "./posts/main";
import redditSearch from "./search/main";
import searchLastMessage from "./searchLastMessage";
import redditSubreddit from "./subreddit/main";
import redditUser from "./user/main";

export default function linkChecker(input: string, linksOnly?: boolean): LinkCheckerModule | undefined {

    // Create url
    let inputURL: string = input;
    if ((!inputURL.startsWith("http://")) && (!inputURL.startsWith("https://"))) inputURL = `http://${inputURL}`;
    let url: URL = new URL("https://this_variable_needs_to_be_defined");
    try { url = new URL(inputURL); } catch { }

    // Regexes
    const HOSTNAME_REGEX: RegExp = /^(www\.)?reddit\.com$/;

    if (HOSTNAME_REGEX.test(url.hostname)) {

        // Check if input is a post
        const post = url.pathname.match(/\/r\/(.+)\/comments\/(.+)/);
        if (post) return (message: Message) => redditPost(message, post[2].split("/")[0], post[1]);

        // Check if input is subreddit posts
        const posts = url.pathname.match(/\/(r|u|user)\/(.+)(\/hot|\?sort=new)/);
        if ((posts) && ((url.pathname.endsWith("/hot")) || (url.searchParams.get("sort") === "new"))) return (message: Message) => redditPosts(message, posts[2].split("/")[0], posts[1] === "r" ? "subreddit" : "user");

        // Check if input is a subreddit
        const subreddit = url.pathname.match(/\/r\/(.+)/);
        if (subreddit) return (message: Message) => redditSubreddit(message, subreddit[1]);

        // Check if input is a user
        const user = url.pathname.match(/\/(u|user)\/(.+)/);
        if (user) return (message: Message) => redditUser(message, user[2]);

        // Check if input is a search link
        if ((url.pathname === "/search") && (url.searchParams.get("q"))) return (message: Message) => redditSearch(message, url.searchParams.get("q") as string);

        // Check if input is home
        if (url.pathname === "/") return (message: Message) => redditHome(message);
    }

    if (!linksOnly) {

        // Check if input is an r/subreddit
        const subredditName = input.match(/u\/(.+)/);
        if (subredditName) return (message: Message) => redditUser(message, subredditName[1]);

        // Check if input is a u/user
        const username = input.match(/r\/(.+)/);
        if (username) return (message: Message) => redditSubreddit(message, username[1]);

        // Check if input is feed
        if (input.toLowerCase().replace(/\s+/g, "") === "feed") return (message: Message) => redditFeed(message);

        // Check if input is saved posts
        if (["savedposts", "saved"].includes(input.toLowerCase().replace(/\s+/g, ""))) return (message: Message) => redditPosts(message, null, "saved");

        // Check if input is to search last message
        if (input === "^") return (message: Message) => searchLastMessage(message);
    }
}