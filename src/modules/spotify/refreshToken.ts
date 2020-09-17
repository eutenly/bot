import btoa from "btoa";
import fetch, { Response } from "node-fetch";
import User, { Connection } from "../../classes/User/User";
import { Users } from "../../models/index";
import save from "../../models/save";

export default async function refreshToken(user: User) {

    // Get connection
    const connection: Connection | undefined = user.connections["spotify"];
    if (!connection) return;

    // Get access token
    const result: Response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        body: `grant_type=refresh_token&refresh_token=${connection.refreshToken}`,
        headers: {
            "Authorization": `Basic ${btoa(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`)}`,
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });

    // Parse result
    const data: any = await result.json();
    const accessToken = data.access_token;

    // Set data
    connection.accessToken = accessToken;

    // Save data
    const userData = await Users.findById(user.id);
    if (userData) {
        userData.connections.spotify.accessToken = accessToken;
        await save(userData);
    }
}