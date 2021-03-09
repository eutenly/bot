import UserRequest from "../../classes/UserRequest/UserRequest";
import nsfwCheck from "../../util/nsfwCheck";
import website from "./website/main";

export default async function main(userRequest: UserRequest) {

    // Get params
    let url: string | undefined = userRequest.getParameter<string>("link");

    // No url
    if (!url) return userRequest.respond(":x:  **|  Enter a URL**");

    // Parse url
    if ((!url.startsWith("http://")) && (!url.startsWith("https://"))) url = `http://${url}`;

    // Check for localhost
    if (url.startsWith("http://localhost") || url.startsWith("https://localhost")) return userRequest.respond(":x:  **|  This is not a valid URL!**");

    // Check NSFW
    const [success, nsfw] = await nsfwCheck(url);
    if (!success) return userRequest.respond(":x:  **|  This website is unreachable!**");
    if (nsfw) return userRequest.respond(":x:  **|  This website is not permitted on Eutenly!**");

    // Run module
    await website(userRequest, url);
}
