import btoa from "btoa";
import fetch, { Response } from "node-fetch";
import Command from "../../classes/Command/Command";
import { Connection } from "../../classes/User/User";
import { Users } from "../../models/index";
import save from "../../models/save";

export default async function refreshToken(command: Command) {

    // Get connection
    const connection: Connection | undefined = command.message.author.connections[command.connectionName || ""];
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
    const userData = await Users.findById(command.message.author.id);
    if (userData) {
        userData.connections.spotify.accessToken = accessToken;
        await save(userData);
    }
}