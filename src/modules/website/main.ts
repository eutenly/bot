import Message from "../../classes/Message/Message";
import website from "./website";
import nsfwCheck from "./nsfwCheck";

export default async function main(message: Message) {

    // Get url
    let url: string = message.commandContent.split(" ").slice(1).join(" ");

    // No url
    if (!url) return message.channel.sendMessage(":x:  **|  Enter a URL**");

    // Parse url
    if ((!url.startsWith("http://")) && (!url.startsWith("https://"))) url = `http://${url}`;

    // Check for localhost
    if (url.startsWith("http://localhost") || url.startsWith("https://localhost")) return message.channel.sendMessage(":x:  **|  This is not a valid URL!**");

    // Check NSFW
    const [success, nsfw] = await nsfwCheck(url)
    if (!success) return message.channel.sendMessage(":x:  **|  This website is unreachable!**");
    if (nsfw) return message.channel.sendMessage(":x:  **|  This website is not permitted on Eutenly!**");


    // Run module
    website(message, url);
}
