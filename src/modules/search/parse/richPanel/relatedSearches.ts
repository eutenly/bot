import cheerio from "cheerio";
import url from "url";

export default function relatedSearches(section: any): any {

    // Map each element with the `PZPZlf` class
    return section.find(".PZPZlf").map((_index: any, relatedSearch: any) => {

        // Get related search
        relatedSearch = cheerio(relatedSearch);

        // Get the href of the first `a` element
        let query: any = relatedSearch.find("a").first().attr("href");

        // Get query from query url
        query = url.parse(query, true).query.q;

        // Return
        return {

            // Get the text from the `fl` class
            name: relatedSearch.find(".fl").first().text(),

            query
        };
    }).get();
}