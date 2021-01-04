import mongoose from "mongoose";
import Message from "../classes/Message/Message";
import UserRequest from "../classes/UserRequest/UserRequest";

export default async function ping(userRequest: UserRequest) {

    // Set cooldown
    userRequest.user.setCooldown(2000);

    // Websocket
    const websocketPing: number = userRequest.client.ping;

    // Message sending
    let start: number = Date.now();
    const m: Message = await userRequest.respond(":ping_pong:  **|  Pinging...**");
    const messageSending: number = Date.now() - start;

    // Database ping
    start = Date.now();
    await mongoose.connection.db.admin().ping();
    const databasePing: number = Date.now() - start;

    // Edit message
    m.edit(`:ping_pong:  **|  Pong!\n\nConnection to Discord: ${websocketPing} ms\nMessage Sending: ${messageSending} ms\nDatabase Ping: ${databasePing} ms**`);
}