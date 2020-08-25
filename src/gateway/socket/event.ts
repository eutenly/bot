import Client from "../../classes/Client";
import ready from "../events/ready";

export default function event(client: Client, type: string, data: any) {

    // Ready
    if (type === "READY") ready(client, data);
}