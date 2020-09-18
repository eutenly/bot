export default function video(section: any): any {

    // Return
    return {

        // Get the text from the first `h3` element
        title: section.find("h3").first().text(),

        // Get the `h3` element and then get the href
        link: section.find("h3 a").first().attr("href")
    };
}