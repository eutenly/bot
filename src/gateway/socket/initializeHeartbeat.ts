import Client from "../../classes/Client/Client";
import heartbeat from "./heartbeat";

export default function initializeHeartbeat(client: Client, interval: number) {

    // Set interval
    setInterval(() => heartbeat(client), interval);
}