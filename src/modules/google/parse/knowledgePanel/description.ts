export default function description(section: any): any {

    // Return
    return section.find("span").first().text();
}