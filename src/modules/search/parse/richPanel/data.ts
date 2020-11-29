import cheerio from "cheerio";
import { resolve as resolveURL, URL } from "url";

export default function data(section: any): any {

    // Return
    return section.find("li").map((_index: any, item: any) => {

        // Get item
        item = cheerio(item);

        // Return
        return {

            // Get the text of the first `a` element
            title: item.find("a").first().text(),

            // Get the text
            text: item.contents().first().text(),

            // Get the query
            query: new URL(resolveURL("https://bing.com", item.find("a").first().attr("href"))).searchParams.get("q")
        };
    }).get();
}