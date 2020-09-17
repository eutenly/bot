import Client from "../../classes/Client/Client";

export default function ping(client: Client) {

    // Set last ping timestamp
    client.lastPingTimestamp = Date.now();

    // Ping
    client.ws.ping();
}