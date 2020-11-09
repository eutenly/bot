import Message from "../../classes/Message/Message";
import sendLoginEmbed from "../../util/sendLoginEmbed";
import fetch from "./fetch";
import track from "./track/main";

export default async function current(message: Message) {

    // Get connection
    await message.author.getConnection("spotify");

    // Check for no-connection
    if (!message.author.connections["spotify"]) { sendLoginEmbed(message.author, message.channel, "spotify"); return; }

    // Fetch
    const data: any = await fetch(message.author, message.channel, "https://api.spotify.com/v1/me/player/currently-playing");
    if (!data) return;

    // No current track
    if (!data.currently_playing_type) return message.channel.sendMessage(":x:  **|  You're not listening to anything**");

    // Cant view episodes
    if (data.currently_playing_type === "episode") return message.channel.sendMessage(":x:  **|  Unfortunately, you can't view what you're currently listening to if it's an episode**");

    // View track
    track(message, data.item.id, data.progress_ms);
}