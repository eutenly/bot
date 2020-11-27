import cheerio from "cheerio";
import { resolve as resolveURL, URL } from "url";

export default function products(result: any): any {

    // Return
    return {

        // Set type
        type: "products",

        // Get products
        items: result.find(".slide").map((_index: any, item: any) => {

            // Get item
            item = cheerio(item);

            // Return
            return {
                title: item.find(".ba_cardTitleText").first().text(),
                query: new URL(resolveURL("https://bing.com", item.find("a").first().attr("href"))).searchParams.get("q")
            };
        }).get()
    };
}