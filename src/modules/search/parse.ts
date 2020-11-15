import cheerio from "cheerio";
import { ParserData } from "../../classes/Command/Command";
import parseItemList from "./parse/itemList";
import parseList from "./parse/list";
import parseMain from "./parse/main";
import parseQuestions from "./parse/questions";
import parseRichPanel from "./parse/richPanel/main";
import parseTwitter from "./parse/twitter";

export default function parse(data: string): ParserData | undefined {

    // Parse
    const dom: any = cheerio.load(data);

    // The `g` class and `g-section-with-header` elements are wrapper divs for each result
    let results: any = dom(".g, g-section-with-header");

    // Map results
    let richPanel: any;
    results = results.map((_index: any, result: any) => {

        // Get result from dom
        result = dom(result);

        // Element has `g-section-with-header` element
        if (result.find("g-section-with-header").first().length) return;

        // Get classes
        let classes: any = result.attr("class");
        classes = classes ? classes.split(" ") : [];

        // Rich panel
        if (classes.includes("liYKde")) {
            richPanel = parseRichPanel(result);
            return;
        }

        // Parse
        if (result.find(".rQgnxe").first().length) return parseTwitter(result);
        else if (result.find(".EDblX").first().length) return parseList(result);
        else if ((classes.includes("kno-kp")) && (classes.includes("mnr-c")) && (classes.includes("g-blk")) && (classes.length === 4)) return parseQuestions(result);
        else if ((classes.includes("mnr-c")) && (classes.includes("g-blk")) && (classes.length === 3)) return parseItemList(result);
        else if (classes.length === 1) return parseMain(result);
    }).get().filter((r: any) => r);

    // Return
    return {
        data: {
            totalResults: dom("#result-stats").text().split(" ").slice(1, 2).join(" "),
            richPanel,
            results
        }
    };
}