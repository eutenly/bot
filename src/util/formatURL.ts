import url from "url";

export default function formatURL(input: string): string {

    // Parse input
    if ((!input.startsWith("http://")) && (!input.startsWith("https://"))) input = `http://${input}`;
    const website = url.parse(input);

    // Return
    return `[${website.hostname}${website.pathname === "/" ? "" : "..."}](${input})`;
}