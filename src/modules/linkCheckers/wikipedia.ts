import Message from "../../classes/Message/Message";
import wikipediaArticle from "../wikipedia/article/main";

export default function wikipedia(input: string, linksOnly?: boolean): Function | undefined {

    // Check if input is an article link
    const article = input.match(/en\.wikipedia\.org\/wiki\/(.+)/);
    if (article) return (message: Message) => wikipediaArticle(message, article[2]);

    if (!linksOnly) {

        // Check if input is an article name
        const articleName = input.match(/"(.+)"/);
        if (articleName) return (message: Message) => wikipediaArticle(message, articleName[1]);
    }
}