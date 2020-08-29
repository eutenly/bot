import Client from "../../classes/Client/Client";
import guildCreate from "../events/guildCreate";
import guildDelete from "../events/guildDelete";
import messageCreate from "../events/messageCreate";
import messageReactionAdd from "../events/messageReactionAdd";
import ready from "../events/ready";
import roleUpdate from "../events/roleUpdate";

export default function event(client: Client, type: string, data: any) {

    // Ready
    if (type === "READY") ready(client, data);

    // Message Create
    else if (type === "MESSAGE_CREATE") messageCreate(client, data);

    // Guild Create
    else if (type === "GUILD_CREATE") guildCreate(client, data);

    // Guild Delete
    else if (type === "GUILD_DELETE") guildDelete(client, data);

    // Message Reaction Add
    else if (type === "MESSAGE_REACTION_ADD") messageReactionAdd(client, data);

    // Role update
    else if (type === "GUILD_ROLE_UPDATE") roleUpdate(client, data);
}