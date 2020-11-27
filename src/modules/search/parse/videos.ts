import cheerio from "cheerio";

export default function videos(result: any): any {

    // Return
    return {

        // Set type
        type: "videos",

        // Get the text from the first `h2` element
        title: result.find("h2").first().text(),

        // Get videos
        items: result.find(".slide").map((_index: any, item: any) => {

            // Get item
            item = cheerio(item);

            // Get source
            let source: any = item.find(".mc_vtvc_meta_row_channel").first();
            if (!source.length) source = item.find(".mc_vtvc_meta_channel").first();
            source = source.text();

            // Return
            return {
                title: item.find(".mc_vtvc_title").first().text(),
                link: item.find("a").first().attr("href"),
                source,
                time: item.find(".mc_vtvc_meta_pubdate span").first().text()
            };
        }).get()
    };
}