import cheerio from "cheerio";

export default function main(result: any): any {

    // Get the text from the first `p` element in the element with the `b_caption` class
    let description: any = result.find(".b_caption p").first().html();

    // Replace `strong` tags with `**`
    description = description.replace(/(<strong>|<\/strong>)/g, "**");

    // Parse html to text
    description = cheerio.load(description);
    description = description.text();

    // Return
    return {

        // Set type
        type: "main",

        // Get the text from the first `h2` element
        title: result.find("h2").first().text(),

        description,

        // Get the href of the first `a` element
        link: result.find("a").first().attr("href")
    };
}