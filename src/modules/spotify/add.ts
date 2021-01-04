import UserRequest from "../../classes/UserRequest/UserRequest";
import collectStat from "../../util/collectStat";
import fetch from "./fetch";

export default async function add(userRequest: UserRequest, itemID: string, itemName: string, type: string) {

    // Get params
    const input: string | undefined = userRequest.getParameter<string>("result") || userRequest.getParameter<string>("link-or-result");

    // No input
    if (!input) return userRequest.respond(":x:  **|  Which playlist would you like to add this song to?**");

    // Get connection
    await userRequest.user.getConnection("spotify");

    // Get playlists
    const playlists: any = await fetch(userRequest.user, userRequest, "https://api.spotify.com/v1/me/playlists?limit=50");
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
    if (!playlist) return userRequest.respond(":x:  **|  I couldn't find that playlist**");

    // Add item
    await fetch(userRequest.user, userRequest, `https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, "POST", {
        uris: [`spotify:${type}:${itemID}`]
    });

    // Collect stats
    collectStat(userRequest.client, {
        measurement: "commands_used",
        tags: {
            dms: userRequest.guild ? undefined : true
        },
        fields: {
            command: "add",
            commandType: "spotify"
        }
    });

    // Send
    userRequest.respond(`<:spotify:${userRequest.client.eutenlyEmojis.get("spotify")}>  **|  ${itemName} has been added to ${playlist.name}**`);
}