import crypto from "crypto";
import nodeFetch, { Response } from "node-fetch";
import { URL, URLSearchParams } from "url";
import Channel from "../../classes/Channel/Channel";
import User, { Connection } from "../../classes/User/User";
import randomString from "../../util/randomString";
import sendLoginEmbed from "../../util/sendLoginEmbed";

export default async function fetch(user: User, channel: Channel, url: string, method: string = "GET"): Promise<any> {

    // Get connection
    const connection: Connection | undefined = user.connections["twitter"];
    if (!connection) {
        sendLoginEmbed(user, channel, "twitter");
        return;
    }

    // Get data
    const CONSUMER_KEY: string = process.env.TWITTER_API_KEY || "";
    const nonce: string = await randomString(32);
    const SIGNATURE_METHOD: string = "HMAC-SHA1";
    const timestamp: number = Math.floor(Date.now() / 1000);
    const token: string = connection.accessToken || "";
    const VERSION: string = "1.0";

    // Get url params
    const parsedURL: URL = new URL(url);
    const urlParams: URLSearchParams = parsedURL.searchParams;

    // Add data to url params
    urlParams.set("oauth_consumer_key", CONSUMER_KEY);
    urlParams.set("oauth_nonce", nonce);
    urlParams.set("oauth_signature_method", SIGNATURE_METHOD);
    urlParams.set("oauth_timestamp", timestamp.toString());
    urlParams.set("oauth_token", token);
    urlParams.set("oauth_version", VERSION);

    // Sort url params
    urlParams.sort();

    // Get signature base
    const signatureBase: string = `${method}&${encodeURIComponent(`${parsedURL.origin}${parsedURL.pathname}`)}&${encodeURIComponent(urlParams.toString().replace(/\+/g, "%20"))}`;

    // Get signing key
    const signingKey: string = `${process.env.TWITTER_CLIENT_SECRET}&${connection.accessSecret}`;

    // Sign signature base with signing key
    const signature: string = crypto.createHmac("sha1", signingKey).update(signatureBase).digest("base64");

    // Make request
    const result: Response = await nodeFetch(url, {
        method,
        headers: {
            "User-Agent": "Eutenly",
            "Authorization": `OAuth oauth_consumer_key="${CONSUMER_KEY}", oauth_nonce="${nonce}", oauth_signature="${encodeURIComponent(signature)}", oauth_signature_method="${SIGNATURE_METHOD}", oauth_timestamp="${timestamp}", oauth_token="${token}", oauth_version="${VERSION}"`
        }
    });

    // Parse data
    const data: any = await result.json().catch(() => { }) || {};

    // Authorization failed
    if ((data.errors) && ([215, 32].includes(data.errors[0].code))) {
        sendLoginEmbed(user, channel, "twitter");
        return;
    }

    // Return
    return data;
}