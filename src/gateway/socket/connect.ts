import chalk from "chalk";
import fetch from "node-fetch";
import WebSocket from "ws";
import Client from "../../classes/Client";
import event from "./event";
import heartbeat from "./heartbeat";
import identify from "./identify";
import initializeHeartbeat from "./initializeHeartbeat";

export default async function connect(client: Client) {

    // Log
    console.log(chalk.magenta("Gateway: Connecting..."));

    // Get gateway bot
    let gatewayData = await fetch("https://discord.com/api/gateway/bot", {
        headers: {
            "Authorization": `Bot ${client.token}`
        }
    });
    gatewayData = await gatewayData.json();

    // Create websocket
    const ws: WebSocket = new WebSocket(`${gatewayData.url}?v=6&encoding=json`, {
        perMessageDeflate: false,
    });

    // Set websocket
    client.ws = ws;

    // Open websocket
    ws.on("open", function open() {

        // Log
        console.log(chalk.green("Gateway: Connected"));

        // Identify
        identify(ws, client.token);
    });

    // Heartbeat and events
    ws.on("message", function message(rawPacket: string) {

        // Parse packet
        const packet = JSON.parse(rawPacket);

        // Sequence
        if (packet.s) client.updateSequence(packet.s);

        // Dispatch
        if (packet.op === 0) event(client, packet.t, packet.d);

        // Heartbeat
        else if (packet.op === 1) heartbeat(client);

        // Hello
        else if (packet.op === 10) initializeHeartbeat(client, packet.d.heartbeat_interval);
    });
}