import cheerio from "cheerio";

export default function news(result: any): any {

    // Return
    return {

        // Set type
        type: "news",

        // Get the text from the first `h2` element
        title: result.find("h2").first().text(),

        // Get the top article
        topItem: {
            title: result.find(".na_ti .na_t").first().text(),
            description: result.find(".na_ti .itm_spt").first().text(),
            link: result.find(".na_ti a").first().attr("href"),
            source: result.find(".na_ti cite").first().attr("title"),
            time: result.find(".na_ti cite span").first().text().substring(3)
        },

        // Get articles
        items: result.find(".na_cl .slide").map((_index: any, item: any) => {

            // Get item
            item = cheerio(item);

            // See all card
            if (item.attr("class").split(" ").includes("see_more")) return;

            // Return
            return {
                title: item.find(".na_t").first().text(),
                link: item.find("a").first().attr("href"),
                source: item.find("cite").first().attr("title"),
                time: item.find("cite span").first().text().substring(3)
            };
        }).get().filter((r: any) => r)
    };
}