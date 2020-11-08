import Message from "../../classes/Message/Message";
import { LinkCheckerModule } from "../website/website/main";
import wikipediaArticle from "../wikipedia/article/main";
import searchLastMessage from "../wikipedia/searchLastMessage";

export default function wikipedia(input: string, linksOnly?: boolean): LinkCheckerModule | undefined {

    // Check if input is an article link
    const article = input.match(/en\.wikipedia\.org\/wiki\/(.+)/);
    if (article) return (message: Message) => wikipediaArticle(message, article[2]);

    if (!linksOnly) {

        // Check if input is an article name
        const articleName = input.match(/"(.+)"/);
        if (articleName) return (message: Message) => wikipediaArticle(message, articleName[1]);

        // Check if input is to search last message
        if (input === "^") return (message: Message) => searchLastMessage(message);
    }
}