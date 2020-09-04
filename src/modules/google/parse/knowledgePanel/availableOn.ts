import cheerio from "cheerio";

export default function availableOn(section: any): any {

    // Map each `tr` element
    return section.find("tr").map((_index: any, platform: any) => {

        // Get platform
        platform = cheerio(platform);

        // Return
        return {

            // Get the `hl` class and then get the text
            name: platform.find(".hl").first().text(),

            // Get the `a` element and then get the href
            link: platform.find("a").first().attr("href")
        };
    }).get();
}