import chalk from "chalk";
import fetch from "node-fetch";
import WebSocket from "ws";
import Client from "../../classes/Client/Client";
import event from "./event";
import heartbeat from "./heartbeat";
import identify from "./identify";
import initializeHeartbeat from "./initializeHeartbeat";
import resume from "./resume";

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
        perMessageDeflate: false
    });

    // Set websocket
    client.ws = ws;

    // Websocket opened
    ws.on("open", () => {

        // Log
        console.log(chalk.green("Gateway: Connected"));

        // Identify
        if (!client.sessionID) identify(ws, client.token);

        // Resume
        else resume(client);
    });

    // Heartbeat and events
    ws.on("message", (rawPacket: string) => {

        // Parse packet
        const packet = JSON.parse(rawPacket);

        // Sequence
        if (packet.s) client.updateSequence(packet.s);

        // Dispatch
        if (packet.op === 0) event(client, packet.t, packet.d);

        // Heartbeat
        else if (packet.op === 1) heartbeat(client);

        // Invalid Session
        else if (packet.op === 9) ws.close(4020, "Session invalidated by Discord");

        // Hello
        else if (packet.op === 10) initializeHeartbeat(client, packet.d.heartbeat_interval);
    });

    // Websocket closed
    // https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-close-event-codes
    ws.on("close", (code: number, reason: string) => {

        // Parse reason
        if (code === 4020) reason = "Session invalidated by Discord";

        // Log
        console.log(chalk.red(`Gateway: Closed - ${code} ${reason}`));

        // Exit process
        if ([4004, 4010, 4011, 4012, 4013, 4014].includes(code)) {

            // Log
            console.log(chalk.red("Exiting process"));

            // Exit
            process.exit();
        }

        // Log
        console.log(chalk.red("Gateway: Reconnecting..."));

        // Must start new session
        if ([4007, 4009, 4020].includes(code)) client.sessionID = undefined;

        // Reconnect
        connect(client);
    });
}