import cheerio from "cheerio";

export default function profiles(section: any): any {

    // Return
    return section.find("li").map((_index: any, item: any) => {

        // Get item
        item = cheerio(item);

        // Return
        return {

            // Get the text of the first `span` element
            name: item.find("span").first().text(),

            // Get the href of the first `a` element
            link: item.find("a").first().attr("href")
        };
    }).get();
}