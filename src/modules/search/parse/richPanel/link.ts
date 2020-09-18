export default function link(section: any): any {

    // Return
    return section.find("a").first().attr("href");
}