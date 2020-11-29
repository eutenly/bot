import cheerio from "cheerio";

export default function gridList(section: any): any {

    // Return
    return {

        // Get the text from the first `h2` element
        title: section.find("h2").first().text(),

        // Get items
        items: section.find(".b_mdrpad").map((_index: any, item: any) => {

            // Get item
            item = cheerio(item);

            // Return
            return {

                // Get the text
                text: item.find("p a").first().text(),

                // Get the link
                link: item.find("p a").first().attr("href")
            };
        }).get()
    };
}