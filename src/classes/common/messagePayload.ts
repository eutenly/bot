import { EmbedData } from "../Embed/Embed";

export default function messagePayload(content: string | EmbedData, embed: EmbedData = {}): object {

    // Parse content
    if (typeof content === "object") {
        embed = content;
        content = "";
    }

    // Trim content
    content = content.trim();

    // Validate data
    if ((content.length === 0) && (!Object.keys(embed).length)) throw new Error("Can't send an empty message");
    if (content.length > 2000) throw new Error("Messages can't be more than 2000 characters");

    // Return
    return {
        content,
        embed
    };
}