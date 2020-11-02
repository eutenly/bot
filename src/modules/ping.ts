import mongoose from "mongoose";
import Message from "../classes/Message/Message";

export default async function ping(message: Message) {

    // Set cooldown
    message.author.setCooldown(2000);

    // Websocket
    const websocketPing: number = message.client.ping;

    // Message sending
    let start: number = Date.now();
    const m: Message = await message.channel.sendMessage(":ping_pong:  **|  Pinging...**");
    const messageSending: number = Date.now() - start;

    // Database ping
    start = Date.now();
    await mongoose.connection.db.admin().ping();
    const databasePing: number = Date.now() - start;

    // Edit message
    m.edit(`:ping_pong:  **|  Pong!\n\nConnection to Discord: ${websocketPing} ms\nMessage Sending: ${messageSending} ms\nDatabase Ping: ${databasePing} ms**`);
}