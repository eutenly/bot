import Message from "../../classes/Message/Message";
import website from "./website";

export default async function main(message: Message) {

    // Get url
    let url: string = message.content.split(" ").slice(1).join(" ");

    // No url
    if (!url) return message.channel.sendMessage(":x:  **|  Enter a URL**");

    // Parse url
    if ((!url.startsWith("http://")) && (!url.startsWith("https://"))) url = `http://${url}`;

    // Run module
    website(message, url);
}