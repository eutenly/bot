import cheerio from "cheerio";
import url from "url";

export default function products(section: any): any {

    // Map each element with the `FwbF3b` class
    return section.find(".FwbF3b").map((_index: any, product: any) => {

        // Get product
        product = cheerio(product);

        // Get the href of the first `a` element
        let query: any = product.find("a").first().attr("href");

        // Get query from query url
        query = url.parse(query, true).query.q;

        // Get the `JMXJNc` class
        let rating: any = product.find(".JMXJNc").first();

        // Get the rating amount
        let ratingAmount: any = rating.find(".Fam1ne").first().attr("aria-label");
        ratingAmount = ratingAmount.replace(/ out of /g, "/");
        ratingAmount = ratingAmount.substring(0, ratingAmount.length - 1);

        // Get the total ratings
        let totalRatings: any = rating.find(".mactI").first().text();
        totalRatings = totalRatings.substring(1, totalRatings.length - 1);

        rating = { rating: ratingAmount, totalRatings };

        // Return
        return {

            // Get the text from the `AI9BBc` class
            name: product.find(".AI9BBc").first().text(),

            query,

            rating
        };
    }).get().slice(0, 3);
}