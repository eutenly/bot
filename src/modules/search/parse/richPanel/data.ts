import cheerio from "cheerio";

export default function data(section: any): any {

    // Return
    return section.find("li").map((_index: any, item: any) => {

        // Get item
        item = cheerio(item);

        // Get the text of the first `a` element
        const title: any = item.find("a").first().text();

        // Return
        return {

            title,

            // Get the text
            text: item.text().substring(title.length + 1)
        };
    }).get();
}