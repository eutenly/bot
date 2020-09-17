import cheerio from "cheerio";
import url from "url";

export default function list(result: any): any {

    // Return
    return {

        // Set type
        type: "list",

        // Get the text from the `e2BEnf` and `CCb0ac` classes
        title: result.find(".e2BEnf, .CCb0ac").first().text(),

        // Map each element where its `role` is `listitem` or it has the `gXGikb`, `gT5me`, `hhvWNc`, or `HCE9ac` class
        items: result.find(`[role="listitem"], .gXGikb, .gT5me, .hhvWNc, .HCE9ac`).map((index: any, item: any) => {

            // Limit to 3 items
            if (index > 2) return;

            // Get item
            item = cheerio(item);

            // Get the `CEMjEf`, `YQPQv`, `cJzOGc`, and `K0YnOd` classes (item source)
            let source: any = item.find(".CEMjEf span, .YQPQv, .cJzOGc, .K0YnOd span").first();

            // If the source exists, get the text, otherwise get the image's alt text
            if (source.length) source = source.text();
            else {
                source = item.find(".CEMjEf img").first();
                source = source.length ? source.attr("alt") : null;
            }

            // Get the `ZE0LJd`, `GJhQm`, `zECGdd`, and `vq2gWb` classes (item time)
            let time: any = item.find(".ZE0LJd span, .GJhQm span:not(.f), .zECGdd:not(.RgAZAc), .vq2gWb").first();

            // If the time exists, get the text
            if (time.length) {
                if ((time.hasClass("zECGdd")) || (time.hasClass("vq2gWb"))) {
                    time = time.text().replace(/\xa0/g, " ").split(" - ");
                    time = time[time.length - 1];
                }
                else time = time.text();
            }
            else time = null;

            // Get the `Qw19wb` class (item rating)
            let rating: any = item.find(".Qw19wb").first();
            if (rating.length) {

                let ratingAmount: any = rating.find(".Fam1ne").first().attr("aria-label");
                ratingAmount = ratingAmount.replace(/ out of /g, "/");
                ratingAmount = ratingAmount.substring(0, ratingAmount.length - 1);

                let totalRatings: any = rating.find(".xdUCw").first().text();
                totalRatings = totalRatings.substring(1, totalRatings.length - 1);

                rating = { rating: ratingAmount, totalRatings };
            }
            else rating = null;

            // Get the href from the `a` element (item link)
            let link: any = item.find("a").first().attr("href");

            // Get query from query link
            let query: any;
            if (link.startsWith("/search")) {
                query = url.parse(link, true).query.q;
                link = null;
            }

            // Return
            return {

                // Get the text from the `oz3cqf`, `pZYoKe`, `cU5Wo`, and `EJGRZ` classes (item title)
                title: item.find(".oz3cqf, .pZYoKe, .cU5Wo, .EJGRZ").first().text(),

                source,

                time,

                rating,

                link,

                query
            };
        }).get().slice(0, 3)
    };
}