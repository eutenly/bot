import cheerio from "cheerio";
import { resolve as resolveURL, URL } from "url";

export default function list(section: any): any {

    // Return
    return {

        // Get the text from the first `h2` element
        title: section.find("h2").first().text(),

        // Get items
        items: section.find("li").map((_index: any, item: any) => {

            // Get item
            item = cheerio(item);

            // Return
            return {

                // Get the text
                text: item.find(".b_imgSetData a").first().text(),

                // Get the query
                query: new URL(resolveURL("https://bing.com", item.find("a").first().attr("href"))).searchParams.get("q")
            };
        }).get()
    };
}