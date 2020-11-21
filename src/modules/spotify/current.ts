import Message from "../../classes/Message/Message";
import sendLoginEmbed from "../../util/sendLoginEmbed";
import episode from "./episode/main";
import fetch from "./fetch";
import track from "./track/main";

export default async function current(message: Message) {

    // Get connection
    await message.author.getConnection("spotify");

    // Check for no-connection
    if (!message.author.connections["spotify"]) { sendLoginEmbed(message.author, message.channel, "spotify"); return; }

    // Fetch
    const data: any = await fetch(message.author, message.channel, "https://api.spotify.com/v1/me/player/currently-playing?additional_types=episode");
    if (!data) return;

    // No current track
    if (!data.currently_playing_type) return message.channel.sendMessage(":x:  **|  You're not listening to anything**");

    // Advertisement
    if (data.currently_playing_type === "ad") return message.channel.sendMessage(":pensive:  **|  Sucks to have to listen to ads, doesn't it?**");

    // View item
    if (data.currently_playing_type === "track") track(message, data.item.id, data.progress_ms);
    else if (data.currently_playing_type === "episode") episode(message, data.item.id, data.progress_ms);
}