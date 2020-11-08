import Message from "../../classes/Message/Message";
import fetch from "./fetch";

export default async function updatePlayer(message: Message, action: string) {

    // Get connection
    await message.author.getConnection("spotify");

    // Get method
    const method: string = ["play", "pause"].includes(action) ? "PUT" : "POST";

    // Update player
    const result: any = await fetch(message.author, message.channel, `https://api.spotify.com/v1/me/player/${action}`, method);

    // Not listening to anything
    if (result.error?.reason === "NO_ACTIVE_DEVICE") return message.channel.sendMessage(":x:  **|  You aren't listening to anything**");

    // User doesn't have premium
    if (result.error?.reason === "PREMIUM_REQUIRED") return message.channel.sendMessage(":x:  **|  You need to have Spotify Premium in order for bots to be able to control your player**");

    // No next/previous track
    if ((result.error?.status === 403) && (action === "next")) return message.channel.sendMessage(":x:  **|  There isn't a next track**");
    else if ((result.error?.status === 403) && (action === "previous")) return message.channel.sendMessage(":x:  **|  There isn't a previous track**");

    // Get action response
    let actionResponse: string | undefined;
    if (action === "play") actionResponse = "Resumed";
    else if (action === "pause") actionResponse = "Paused";
    else if (action === "next") actionResponse = "Skipped";
    else if (action === "previous") actionResponse = "The previous track is now playing";

    // Send
    message.channel.sendMessage(`<:spotify:${message.client.eutenlyEmojis.get("spotify")}>  **|  ${actionResponse}**`);
}