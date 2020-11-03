import nodeFetch, { Response } from "node-fetch";

export default async function nsfwCheck(url: string): Promise<[boolean, boolean]> {
    // Format URL to Domain
    let domain = url
    domain = domain.replace("http://", "")
    domain = domain.replace("https://", "")
    domain = domain.split('/')[0]

    // Request DNS from CF Families to check for NSFW content
    const result: Response = await nodeFetch(`https://family.cloudflare-dns.com/dns-query?name=${domain}`, {
        method: "GET",
        headers: {
            "User-Agent": "Eutenly",
            "accept": "application/dns-json"
        },
    });

    // Parse result
    const data = await result.json()

    // Check if the website could be resolved
    if (data.Status != 0) return [false, false]

    // Check for an empty DNS result (aka blocked)
    if (data.Answer[0].data == "0.0.0.0") return [true, true]

    return [true, false]
}
