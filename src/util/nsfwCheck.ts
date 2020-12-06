import nodeFetch, { Response } from "node-fetch";
import { URL } from "url";

export default async function nsfwCheck(inputURL: string): Promise<[boolean, boolean]> {

    // Format URL to Domain
    let url: URL | undefined;
    try { url = new URL(inputURL); } catch {
        return [false, false];
    }
    const domain = url.hostname;

    // Request DNS from CF Families to check for NSFW content
    const result: Response = await nodeFetch(`https://family.cloudflare-dns.com/dns-query?name=${domain}`, {
        headers: {
            "User-Agent": "Eutenly",
            "Accept": "application/dns-json"
        },
    });

    // Parse result
    const data = await result.json();

    // Check if the website could be resolved
    if (data.Status !== 0) return [false, false];

    // Check for an empty DNS result (aka blocked)
    if (data.Answer[0].data === "0.0.0.0") return [true, true];

    return [true, false];
}
