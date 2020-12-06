import cheerio from "cheerio";
import { ParserData } from "../../classes/Command/Command";
import parseList from "./parse/list";
import parseMain from "./parse/main";
import parseNews from "./parse/news";
import parseProducts from "./parse/products";
import parseRichPanel from "./parse/richPanel/main";
import parseVideos from "./parse/videos";
import parseWikipedia from "./parse/wikipedia";

export default function parse(data: string, extraData?: any[]): ParserData | undefined {

    // Parse
    const dom: any = cheerio.load(data);

    // The element with the `b_results` id is the wrapper for all the results
    let results: any = dom("#b_results");

    // Map results
    results = results.children().map((_index: any, result: any) => {

        // Get result from dom
        result = dom(result);

        // Get classes
        let classes: any = result.attr("class");
        classes = classes ? classes.split(" ") : [];

        // Parse
        if (result.find(".ans_nws").first().length) return parseNews(result);
        else if (result.find(".vsathm").first().length) return parseVideos(extraData?.[0]);
        else if (result.find(".brandAns").first().length) return parseProducts(result);
        else if (result.find(".b_vList").first().length) return parseList(result);
        else if (result.find(".b_wikiRichcard").first().length) return parseWikipedia(result);
        else if (classes.includes("b_algo")) return parseMain(result);
    }).get().filter((r: any) => r).slice(0, 5);

    // Rich panel
    const richPanel: any = parseRichPanel(dom);

    // Return
    return {
        data: {
            results,
            richPanel
        }
    };
}