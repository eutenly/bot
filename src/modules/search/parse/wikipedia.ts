export default function wikipedia(result: any): any {

    // Return
    return {

        // Set type
        type: "wikipedia",

        // Get the text from the first `h2` element
        title: result.find("h2").first().text(),

        // Get the text from the first element with the `b_paractl` class
        description: result.find(".b_paractl").first().text(),

        // Get the href of the first `a` element
        link: result.find("a").first().attr("href")
    };
}