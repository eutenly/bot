import cheerio from "cheerio";
import url from "url";

export default function itemList(result: any): any {

    // Return
    return {

        // Set type
        type: "itemList",

        // Get the text from the `VLkRKc` class (item list title)
        title: result.find(".VLkRKc").first().text(),

        // Map each element with the `PZPZlf` class (item list item)
        items: result.find(".PZPZlf").map((_index: any, item: any) => {

            // Get item
            item = cheerio(item);

            // Get the href of the first `a` element
            let query: any = item.find("a").first().attr("href");

            // Get query from query url
            query = url.parse(query, true).query.q;

            // Return
            return {

                // Get the text from the `fl` class (item name)
                name: item.find(".fl").first().text(),

                query
            };
        }).get()
    };
}