import cheerio from "cheerio";
import { URL } from "url";
import { ParserData } from "../../../classes/Command/Command";

export default function parse(data: any): ParserData | undefined {

    // No article
    if (data.error) return;

    // Parse
    const dom: any = cheerio.load(data.parse.text["*"]);

    // The first `p` element after the element with the `mw-empty-elt` class has the snippet
    let snippet: any = dom(".mw-empty-elt ~ p").get().filter((_index: any, element: any) => {
        const classes: any = dom(element).attr("class");
        return ((!classes) || (!classes.includes("mw-empty-elt")));
    });
    snippet = dom(snippet).html();

    // Convert bold text to markdown
    snippet = snippet.replace(/(<b>|<\/b>)/g, "**");

    // Convert links to markdown
    snippet = snippet.replace(/<a href="(.+?)"(.*?)>(.+?)<\/a>/g, (match: string, link: string, p2: string, text: string) => {

        // Ignore hash urls
        if (link.startsWith("#")) return "";

        // Parse url
        const url: URL = new URL(link, "https://en.wikipedia.org");

        // Return parsed link
        return `[${text}](${url.href})`;
    });

    // Remove other html
    snippet = cheerio.load(snippet);
    snippet = snippet.text();

    // Return
    return {
        data: {
            title: data.parse.title,
            snippet
        }
    };
}