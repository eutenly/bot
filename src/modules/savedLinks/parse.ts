import { URL } from "url";
import { ParserData } from "../../classes/Command/Command";

export default function parse(data: any): ParserData {

    // No issue
    if (!data) return { noData: true };

    // Parse eutenly links
    data.forEach((l: any) => {

        if (l.url.startsWith("eutenly://")) {

            // Parse url
            const url: URL = new URL(l.url);

            // Set title
            l.title = `${url.hostname.charAt(0).toUpperCase()}${url.hostname.substring(1)}: ${url.pathname.split("/").slice(1).map((d: string) => `${d.charAt(0).toUpperCase()}${d.substring(1)}`).join(" - ")}`;
        }
    });

    // Return
    return {
        data
    };
}