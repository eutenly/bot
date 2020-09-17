import cheerio from "cheerio";
import url from "url";

export default function list(section: any): any {

    // Return
    return {

        // Get the `Ss2Faf` class and then get the text
        title: section.find(".Ss2Faf").first().text(),

        // Map each element with the `PZPZlf` class
        items: section.find(".PZPZlf").map((_index: any, item: any) => {

            // Get item
            item = cheerio(item);

            // Get the href of the first `a` element
            let query: any = item.find("a").first().attr("href");

            // Get query from query url
            query = url.parse(query, true).query.q;

            // Return
            return {

                // Get the `title` class and then get the text
                name: item.find(".title").first().text(),

                query
            };
        }).get()
    };
}