import cheerio from "cheerio";
import { ParserData } from "../../classes/Command/Command";
import parseList from "./parse/list";
import parseMain from "./parse/main";
import parseNews from "./parse/news";
import parseProducts from "./parse/products";
import parseVideos from "./parse/videos";

export default function parse(data: string, extraData?: any[]): ParserData | undefined {

    // Parse
    const dom: any = cheerio.load(data);

    // The element with the `b_results` id is the wrapper for all the results
    let results: any = dom("#b_results");

    // Map results
    let richPanel: any;
    results = results.children().map((_index: any, result: any) => {

        // Get result from dom
        result = dom(result);

        // Get classes
        let classes: any = result.attr("class");
        classes = classes ? classes.split(" ") : [];

        // Rich panel
        // if (classes.includes("liYKde")) {
        //     richPanel = parseRichPanel(result);
        //     return;
        // }

        // Parse
        if (result.find(".ans_nws").first().length) return parseNews(result);
        else if (result.find(".vsathm").first().length) return parseVideos(extraData?.[0]);
        else if (result.find(".brandAns").first().length) return parseProducts(result);
        else if (result.find(".b_vList").first().length) return parseList(result);
        else if (classes.includes("b_algo")) return parseMain(result);
    }).get().filter((r: any) => r).slice(0, 5);

    // Return
    return {
        data: {
            richPanel,
            results
        }
    };
}