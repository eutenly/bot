import cheerio from "cheerio";

export default function events(section: any): any {

    // Return
    return {

        // Get the text from the first `h2` element
        title: section.find("h2").first().text(),

        // Get items
        items: section.find(".b_hPanel").map((_index: any, item: any) => {

            // Get item
            item = cheerio(item);

            // Return
            return {

                // Get the name
                name: item.find(".b_demoteText").first().text(),

                // Get the location
                location: item.find("a").first().text(),

                // Get the date
                date: item.find(".ev_tpdate .b_demoteText").first().text()
            };
        }).get()
    };
}