import fetch from "node-fetch";
import { terminal } from "terminal-kit";
import WebSocket from "ws";
import Client from "../../classes/Client/Client";
import event from "./event";
import heartbeat from "./heartbeat";
import identify from "./identify";
import initializeHeartbeat from "./initializeHeartbeat";
import ping from "./ping";
import resume from "./resume";

export default async function connect(client: Client) {

    // Log
    const connectingStart = Date.now();
    terminal.magenta.bold("Gateway: Connecting...\n");
    terminal("  - ").magenta("Getting gateway data...\n");

    // Get gateway bot
    let gatewayData = await fetch("https://discord.com/api/gateway/bot", {
        headers: {
            "Authorization": `Bot ${client.token}`
        }
    });
    gatewayData = await gatewayData.json();

    const websocketStart = Date.now();
    terminal.column(1).up(1).right("  - Getting gateway data".length)(" - ").green(`Done! (${Date.now() - connectingStart}ms)\n`);
    terminal("  - ").magenta("Creating websocket...\n");

    // Create websocket
    const ws: WebSocket = new WebSocket(`${gatewayData.url}?v=6&encoding=json`, {
        perMessageDeflate: false
    });

    // Set websocket
    client.ws = ws;

    // Websocket opened
    ws.on("open", () => {

        // Log
        terminal.column(1).up(1).right("  - Creating websocket".length)(" - ").green(`Done! (${Date.now() - websocketStart}ms)\n`);

        // Identify
        if (!client.sessionID) {

            identify(ws, client.token);

            // Log
            terminal("  - ").green("Sent identify payload\n");
        }

        // Resume
        else {

            resume(client);

            // Log
            terminal("  - ").green("Sent resume payload\n");
        }

        // Start pinging
        ping(client);
        client.pingInterval = setInterval(() => ping(client), 30000);
    });

    // Pong
    ws.on("pong", () => client.ping = Date.now() - client.lastPingTimestamp);

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
        else if (packet.op === 9) ws.close(4021, "Session invalidated by Discord");

        // Hello
        else if (packet.op === 10) {

            initializeHeartbeat(client, packet.d.heartbeat_interval);

            // Log
            terminal("  - ").green("Initialized heartbeat\n");
            terminal.column(1).up(5).right("Gateway: Connecting".length)(" - ").green(`Done! (${Date.now() - connectingStart}ms)\n`).down(4)("\n");
        }
    });

    // Websocket closed
    // https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-close-event-codes
    ws.on("close", (code: number, reason: string) => {

        // Parse reason
        if (code === 4021) reason = "Session invalidated by Discord";

        // Clear ping interval
        clearInterval(client.pingInterval);

        // Log
        terminal.red.bold("\nGateway: Closed").styleReset(" - ").red.bold(code).red(` ${reason}\n`);

        // Exit process
        if ([4004, 4010, 4011, 4012, 4013, 4014].includes(code)) {

            // Log
            terminal("  - ").red("Exiting process\n");

            // Exit
            process.exit();
        }

        // Log
        terminal("  - ").red("Reconnecting to gateway\n\n");

        // Must start new session
        if ([4007, 4009, 4021].includes(code)) client.sessionID = undefined;

        // Reconnect
        connect(client);
    });
}