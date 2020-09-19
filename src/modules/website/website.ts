import cheerio from "cheerio";
import fetch, { Response } from "node-fetch";
import { parse as parseURL, resolve as resolveURL, UrlWithStringQuery } from "url";
import Embed from "../../classes/Embed/Embed";
import Message from "../../classes/Message/Message";
import { Websites } from "../../models/index";
import catchPromise from "../../util/catchPromise";
import getColor from "../../util/getColor";
import githubLinkChecker from "../linkCheckers/github";
import spotifyLinkChecker from "../linkCheckers/spotify";
import twitterLinkChecker from "../linkCheckers/twitter";
import youtubeLinkChecker from "../linkCheckers/youtube";

export default async function website(message: Message, url: string) {

    // Link checkers
    const linkCheckers: Function[] = [youtubeLinkChecker, twitterLinkChecker, githubLinkChecker, spotifyLinkChecker];
    for (let lc of linkCheckers) {
        const runModule: Function | undefined = lc(url, true);
        if (runModule) return runModule(message);
    }

    // Fetch
    const result: Response = await catchPromise(fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36" }
    }));

    // Invalid response
    if ((!result) || (!result.ok)) return message.channel.sendMessage(":x:  **|  I couldn't find that website**");

    // Set url in case redirects were followed
    url = result.url;

    // Parse data
    const data: string = await result.text();

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
    icon = resolveURL(url, icon);

    // Fetch icon image
    const iconImage: Response = await fetch(icon);

    // Set icon url
    icon = `https://imageproxy.eutenly.com/ico?url=${encodeURIComponent(iconImage.url)}`;

    // No image
    if (!iconImage.ok) icon = null;

    // Get color
    let color: any = dom(`meta[name="theme-color"]`).first();
    color = color.length ? color.attr("content") : await getColor(icon);

    // Get image
    let image: any = dom(`meta[property="og:image"]`).first();
    image = image.length ? image.attr("content") : null;

    // Get website data
    const parsedURL: UrlWithStringQuery = parseURL(url);
    let urlHostname: string = parsedURL.hostname || "";

    if (urlHostname.startsWith("www.")) urlHostname = urlHostname.substring(4);
    const websiteData = await Websites.findById(urlHostname);

    // Embed
    const embed = new Embed()
        .setAuthor(title || url, icon, url)
        .setColor(color || 0xf40b3d)
        .setImage(image)
        .setBranding();

    if (description) embed.setDescription(description);

    if (websiteData) websiteData.fields.forEach((f) => embed.addField(f.title, f.description, f.inline));

    // Send
    message.channel.sendMessage(embed);
}