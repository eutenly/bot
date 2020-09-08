import crypto from "crypto";
import { URL, URLSearchParams } from "url";
import { Connection } from "../../classes/User/User";
import randomString from "../../util/randomString";

export default async function getAuthorizationHeader(connection: Connection = {}, url: string, method: string) {

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
    const signatureBase: string = `${method}&${encodeURIComponent(`${parsedURL.origin}${parsedURL.pathname}`)}&${encodeURIComponent(urlParams.toString())}`;

    // Get signing key
    const signingKey: string = `${process.env.TWITTER_CLIENT_SECRET}&${connection.accessSecret}`;

    // Sign signature base with signing key
    const signature: string = crypto.createHmac("sha1", signingKey).update(signatureBase).digest("base64");

    // Return
    return `OAuth oauth_consumer_key="${CONSUMER_KEY}", oauth_nonce="${nonce}", oauth_signature="${encodeURIComponent(signature)}", oauth_signature_method="${SIGNATURE_METHOD}", oauth_timestamp="${timestamp}", oauth_token="${token}", oauth_version="${VERSION}"`;
}