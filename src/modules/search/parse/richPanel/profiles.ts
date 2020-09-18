import cheerio from "cheerio";

export default function profiles(section: any): any {

    // Map each element with the `PZPZlf` class
    return section.find(".PZPZlf").map((_index: any, profile: any) => {

        // Get profile
        profile = cheerio(profile);

        // Return
        return {

            // Get the `CtCigf` class and then get the text
            name: profile.find(".CtCigf").first().text(),

            // Get the `a` element and then get the href
            link: profile.find("a").first().attr("href")
        };
    }).get();
}