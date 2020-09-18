export default function title(section: any): any {

    // Get the `wwUB2c` class
    let label: any = section.find(".wwUB2c").first();

    // If the label exists, get the text
    label = label.length ? label.text() : null;

    // Return
    return {

        // Get the text from the first `h2` element
        title: section.find("h2").first().text(),

        label
    };
}