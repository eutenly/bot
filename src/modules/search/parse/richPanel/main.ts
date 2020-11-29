import cheerio from "cheerio";
import { resolve as resolveURL } from "url";
import parseData from "./data";
import parseEvents from "./events";
import parseGridList from "./gridList";
import parseList from "./list";
import parseProfiles from "./profiles";
import parseTopSongs from "./topSongs";

export default function main(dom: any): any {

    // The element with the `b_ans` class in the element with the `b_context` id is the wrapper for the rich panel
    let richPanel: any = dom("#b_context .b_ans");

    // No rich panel
    if (!richPanel.find(".b_subModule").first().length) return;

    // Define data
    const data: any = {

        // Get the text from the first element with the `b_entityTitle` class
        title: richPanel.find(".b_subModule .b_entityTitle").first().text(),

        // Get the text from the first element with the `b_entitySubTitle` class
        label: richPanel.find(".b_subModule .b_entitySubTitle").first().text(),

        // Get the text from the first element with an id that starts with `infoc_`
        description: richPanel.find(`.b_subModule [id^="infoc_"]`).first().text(),

        // Get the href from the first `a` element
        link: richPanel.find(".b_subModule a").first().attr("href"),

        // Get the source from the first `img` element
        image: resolveURL("https://bing.com", richPanel.find(".b_subModule img").first().attr("src")),

        // Other
        lists: []
    };

    // Map sections
    richPanel.find(".b_subModule").map((_index: any, section: any) => {

        // Get section from dom
        section = cheerio(section);

        // Parse
        if (section.find(".b_entityTitle").first().length) section.children().map((_index: any, subsection: any) => {

            // Get subsection from dom
            subsection = cheerio(subsection);

            // Get classes
            let classes: any = subsection.attr("class");
            classes = classes ? classes.split(" ") : [];

            // Parse
            if (classes.includes("infoCardIcons")) data.profiles = parseProfiles(subsection);
            else if (classes.includes("b_vList")) data.data = parseData(subsection);
        }).get();
        else if (section.find(".b_imgSet").first().length) data.lists.push(parseList(section));
        else if (section.find(".b_gridrow").first().length) data.gridList = parseGridList(section);
        else if (section.find(".ev_tpTble").first().length) data.events = parseEvents(section);
        else if (section.find(".music-songlistitem").first().length) data.topSongs = parseTopSongs(section);
    }).get();

    console.log(JSON.stringify(data, null, 4));

    // Return
    return data;
}