import Message from "../../classes/Message/Message";
import UserRequest from "../../classes/UserRequest/UserRequest";
import { LinkCheckerModule } from "../website/website/main";
import wikipediaArticle from "./article/main";
import wikipediaSearch from "./search/main";
import searchLastMessage from "./searchLastMessage";

export default function linkChecker(input: string, linksOnly?: boolean): LinkCheckerModule | undefined {

    // Create url
    let inputURL: string = input;
    if ((!inputURL.startsWith("http://")) && (!inputURL.startsWith("https://"))) inputURL = `http://${inputURL}`;
    let url: URL = new URL("https://this_variable_needs_to_be_defined");
    try { url = new URL(inputURL); } catch { }

    // Regexes
    const HOSTNAME_REGEX: RegExp = /^(www\.)?en\.wikipedia\.org$/;

    if (HOSTNAME_REGEX.test(url.hostname)) {

        // Check if input is an article link
        const article = url.pathname.match(/\/wiki\/(.+)/);
        if (article) return (userRequest: UserRequest) => wikipediaArticle(userRequest, article[1]);

        // Check if input is a search link
        if ((url.pathname === "/w/index.php") && (url.searchParams.get("search"))) return (userRequest: UserRequest) => wikipediaSearch(userRequest, url.searchParams.get("search") as string);
    }

    if (!linksOnly) {

        // Check if input is an article name
        const articleName = input.match(/"(.+)"/);
        if (articleName) return (userRequest: UserRequest) => wikipediaArticle(userRequest, articleName[1]);

        // Check if input is to search last message
        if (input === "^") return (userRequest: UserRequest) => searchLastMessage(userRequest);
    }
}