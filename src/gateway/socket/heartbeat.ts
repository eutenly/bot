import Client from "../../classes/Client/Client";

export default function heartbeat(client: Client) {

    // Send heartbeat
    client.ws.send(JSON.stringify({
        op: 1,
        d: client.sequence
    }));
}