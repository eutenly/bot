import Client from "../../classes/Client/Client";

export default function identify(client: Client) {

    // Resume
    client.ws.send(JSON.stringify({
        op: 6,
        d: {
            token: client.token,
            session_id: client.sessionID,
            seq: client.sequence
        }
    }));
}