export default function data(section: any): any {

    // Get the `w8qArf` class and then get the text
    let name: any = section.find(".w8qArf a").first().text();

    // Get the `kno-fv` class
    let value: any = section.find(".kno-fv").first();

    // Stock price
    if (name.toLowerCase().replace(/\s+/g, "") === "stockprice") value = {

        // Set type
        type: "stockPrice",

        // Get the text from the `fl` and `r3IKmc` classes
        name: `${value.find(".fl").first().text()} ${value.find(".r3IKmc").first().text()}`,

        // Get the text from the 4th child element
        price: value.find(":nth-child(4)").first().text(),

        // Get the text from the 6th child element
        priceChange: value.find(":nth-child(6)").first().text()
    };

    // Text
    else value = value.text();

    // Return
    return {

        name,

        value
    };
}