import cheerio from "cheerio";

export default function twitter(result: any): any {

    // Return
    return {

        // Set type
        type: "twitter",

        // Get the text from the first `a` element
        title: result.find("a").first().text(),

        // Get the href from the first `a` element
        link: result.find("a").first().attr("href"),

        // Map each element with the `nlkcvc` class
        items: result.find(".nlkcvc").map((_index: any, item: any) => {

            // Get item
            item = cheerio(item);

            // Return
            return {

                // Get the text from the `xcQxib` class (item text)
                text: item.find(".xcQxib").first().text(),

                // Get the text from the last element with the `f` class (item time)
                time: item.find(".f").last().text(),

                // Get the href from the `xcQxib` class (item text)
                link: item.find(".xcQxib a").first().attr("href")
            };
        }).get().slice(0, 3)
    };
}