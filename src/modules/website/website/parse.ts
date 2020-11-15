import { ParserData } from "../../../classes/Command/Command";
import { IWebsite } from "../../../models/websites";

export interface WebsiteData {
    title?: string;
    description?: string;
    icon?: string;
    color?: string;
    image?: string;
    websiteData?: IWebsite;
    url: string;
}

export default function parse(data: any): ParserData | undefined {

    // No user
    if (data.error === "invalidResponse") return;

    // Return
    return { data };
}