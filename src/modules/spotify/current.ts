import UserRequest from "../../classes/UserRequest/UserRequest";
import sendLoginEmbed from "../../util/sendLoginEmbed";
import episode from "./episode/main";
import fetch from "./fetch";
import track from "./track/main";

export default async function current(userRequest: UserRequest) {

    // Get connection
    await userRequest.user.getConnection("spotify");

    // Check for no-connection
    if (!userRequest.user.connections["spotify"]) { sendLoginEmbed(userRequest.user, userRequest, "spotify"); return; }

    // Fetch
    const data: any = await fetch(userRequest.user, userRequest, "https://api.spotify.com/v1/me/player/currently-playing?additional_types=episode");
    if (!data) return;

    // No current track
    if (!data.currently_playing_type) return userRequest.respond(":x:  **|  You're not listening to anything**");

    // Advertisement
    if (data.currently_playing_type === "ad") return userRequest.respond(":pensive:  **|  Sucks to have to listen to ads, doesn't it?**");

    // View item
    if (data.currently_playing_type === "track") track(userRequest, data.item.id, data.progress_ms);
    else if (data.currently_playing_type === "episode") episode(userRequest, data.item.id, data.progress_ms);
}