import Client from "../../classes/Client";
import guildCreate from "../events/guildCreate";
import ready from "../events/ready";

export default function event(client: Client, type: string, data: any) {

    // Ready
    if (type === "READY") ready(client, data);

    // Guild Create
    if (type === "GUILD_CREATE") guildCreate(client, data);
}