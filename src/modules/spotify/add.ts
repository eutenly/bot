import Message from "../../classes/Message/Message";
import UserRequest from "../../classes/UserRequest/UserRequest";
import collectStat from "../../util/collectStat";
import fetch from "./fetch";

export default async function add(userRequest: UserRequest) {

    // Get params
    const input: string | undefined = userRequest.getParameter<string>("playlist");

    // Not viewing a track or episode
    if (
        !userRequest.user.command ||
        userRequest.user.command.category !== "spotify" ||
        (
            userRequest.user.command.name !== "track" &&
            userRequest.user.command.name !== "episode"
        )
    ) return userRequest.respond(":x:  **|  You aren't viewing a Spotify track or episode**");

    // Get connection
    await userRequest.user.getConnection("spotify");

    // No input
    if (!input) return userRequest.respond(":x:  **|  Which playlist would you like to add this song to?**");

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
        uris: [`spotify:${userRequest.user.command.name}:${userRequest.user.command.data.id}`]
    });

    // Collect stats
    collectStat(userRequest.client, {
        type: "userInitiatedGuildEvent",
        userID: userRequest.user.id,
        guildID: userRequest.guild?.id,
        eventTrigger: userRequest.source instanceof Message ? "textCommand" : "slashCommand",
        eventService: "spotify",
        eventAction: "add"
    });

    // Send
    await userRequest.respond(`<:spotify:${userRequest.client.eutenlyEmojis.get("spotify")}>  **|  ${userRequest.user.command.data.name} has been added to ${playlist.name}**`);
}