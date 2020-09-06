import cheerio from "cheerio";

export default function main(result: any): any {

    // Get the text from the first element with the `st` class
    let description: any = result.find(".st").first().html();

    // Replace `em` tags with `**`
    description = description.replace(/(<em>|<\/em>)/g, "**");

    // Parse html to text
    description = cheerio.load(description);
    description = description.text();

    // Return
    return {

        // Set type
        type: "main",

        // Get the text from the first `h3` element
        title: result.find("h3").first().text(),

        description,

        // Get the href of the first `a` element
        link: result.find("a").first().attr("href")
    };
}