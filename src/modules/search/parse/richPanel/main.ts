import cheerio from "cheerio";
import parseAvailableOn from "./availableOn";
import parseData from "./data";
import parseDescription from "./description";
import parseLink from "./link";
import parseList from "./list";
import parseLyrics from "./lyrics";
import parseProducts from "./products";
import parseProfiles from "./profiles";
import parseRelatedSearches from "./relatedSearches";
import parseTitle from "./title";
import parseVideo from "./video";

export default function main(result: any): any {

    // The `mod` class is a wrapper div for each section
    let sections: any = result.find(".mod");

    // Map sections
    let data: any = { data: [], list: [] };
    sections.map((_index: any, section: any) => {

        // Get section from dom
        section = cheerio(section);

        // Get type
        const type: any = section.attr("data-md");

        // Parse
        if (type === "16") data.title = parseTitle(section);
        else if (type === "21") data.link = parseLink(section);
        else if (type === "50") data.description = parseDescription(section);
        else if (type === "1001") data.data.push(parseData(section));
        else if (type === "70") data.profiles = parseProfiles(section);
        else if (type === "13") data.relatedSearches = parseRelatedSearches(section);
        else if (type === "418") data.products = parseProducts(section);
        else if (type === "35") data.video = parseVideo(section);
        else if (type === "113") data.lyrics = parseLyrics(section);
        else if (type === "82") data.availableOn = parseAvailableOn(section);
        else if (type === "23") data.list.push(parseList(section));
    }).get();

    // Parse title
    if (data.video) {
        data.title = { title: data.video.title };
        data.link = data.video.link;
    }

    // Return
    return data;
}