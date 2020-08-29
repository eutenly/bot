import Client from "../../classes/Client/Client";
import channelUpdate from "../events/channelUpdate";
import guildCreate from "../events/guildCreate";
import guildDelete from "../events/guildDelete";
import guildMemberUpdate from "../events/guildMemberUpdate";
import messageCreate from "../events/messageCreate";
import messageReactionAdd from "../events/messageReactionAdd";
import ready from "../events/ready";
import roleDelete from "../events/roleDelete";
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

    // Role delete
    else if (type === "GUILD_ROLE_DELETE") roleDelete(client, data);

    // Channel update
    else if (type === "CHANNEL_UPDATE") channelUpdate(client, data);

    // Guild member update
    else if (type === "GUILD_MEMBER_UPDATE") guildMemberUpdate(client, data);
}