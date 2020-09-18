import Message from "../../classes/Message/Message";
import fetch from "./fetch";

export default async function add(message: Message, itemID: string, itemName: string, type: string) {

    // Get params
    let input: string = message.content.split(" ").slice(1).join(" ");

    // No input
    if (!input) return message.channel.sendMessage(":x:  **|  Which playlist would you like to add this song to?**");

    // Get connection
    await message.author.getConnection("spotify");

    // Get playlists
    const playlists: any = await fetch(message, "https://api.spotify.com/v1/me/playlists?limit=50");
    if (!playlists) return;

    // Get playlist
    const playlist: any = playlists.items.find((p: any) => {

        // Parse names
        const playlistName: string = input.toLowerCase().replace(/\s+/g, "");
        const thisPlaylistName: string = p.name.toLowerCase().replace(/\s+/g, "");

        // Return
        return ((thisPlaylistName === playlistName) || (thisPlaylistName.startsWith(playlistName)));
    });

    // Invalid playlist
    if (!playlist) return message.channel.sendMessage(":x:  **|  I couldn't find that playlist**");

    // Add item
    await fetch(message, `https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, "POST", {
        uris: [`spotify:${type}:${itemID}`]
    });

    // Send
    message.channel.sendMessage(`<:spotify:${message.client.eutenlyEmojis.get("spotify")}>  **|  ${itemName} has been added to ${playlist.name}**`);
}