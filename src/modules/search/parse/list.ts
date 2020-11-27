import cheerio from "cheerio";

export default function list(result: any): any {

    // Return
    return {

        // Set type
        type: "list",

        // Get the text from the first `h2` element
        title: result.find("h2").first().text(),

        // Get items
        items: result.find(".b_bullet li").map((_index: any, item: any) => cheerio(item).text()).get(),

        // Get the href of the first `a` element
        link: result.find("a").first().attr("href")
    };
}