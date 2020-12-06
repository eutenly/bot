import { IWebsite } from "../../models/websites";

export interface WebsiteData {
    title?: string;
    description?: string;
    icon?: string;
    color?: string;
    image?: string;
    websiteData?: IWebsite;
    url: string;
}