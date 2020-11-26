import cheerio from "cheerio";
import nodeFetch, { Response } from "node-fetch";
import { parse as parseURL, resolve as resolveURL, UrlWithStringQuery } from "url";
import Channel from "../../classes/Channel/Channel";
import User from "../../classes/User/User";
import { Websites } from "../../models";
import getColor from "../../util/getColor";

export default async function fetch(user: User, channel: Channel, url: string): Promise<any> {

    // Make request
    const result: Response = await nodeFetch(url, {
        headers: { "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36" }
    });

    // Invalid response
    if ((!result) || (!result.ok)) return { error: "invalidResponse" };

    // Get data
    const data = await result.text();

    // Parse
    const dom: any = cheerio.load(data);

    // Get title
    let title: any = dom("title").first();
    title = title.length ? title.text() : null;

    // Get description
    let description: any = dom(`meta[name="description"]`).first();
    description = description.length ? description.attr("content") : null;

    // Get icon
    let icon: any = dom(`link[rel*="icon"]`).first();
    icon = icon.length ? icon.attr("href") : "/favicon.ico";
    icon = resolveURL(result.url, icon);

    // Fetch icon image
    const iconImage: Response = await nodeFetch(icon);

    // Set icon url
    icon = `https://res.cloudinary.com/eutenly/image/fetch/f_auto,w_100/${iconImage.url}`;

    // No image
    if (!iconImage.ok) icon = null;

    // Get color
    let color: any = dom(`meta[name="theme-color"]`).first();
    color = color.length ? color.attr("content") : await getColor(icon);

    // Get image
    let image: any = dom(`meta[property="og:image"]`).first();
    image = image.length ? image.attr("content") : null;
    if (image) image = resolveURL(result.url, image);

    // Image link
    if ([".png", ".jpg", ".jpeg", ".gif"].find((e: string) => result.url.endsWith(e))) {

        title = result.url.split("/");
        title = title[title.length - 1];

        image = result.url;
    }

    // Get website data
    const parsedURL: UrlWithStringQuery = parseURL(result.url);
    let urlHostname: string = parsedURL.hostname || "";

    if (urlHostname.startsWith("www.")) urlHostname = urlHostname.substring(4);
    const websiteData = await Websites.findById(urlHostname);

    // Return
    return {
        title,
        description,
        icon,
        color,
        image,
        websiteData,
        url: result.url
    };
}