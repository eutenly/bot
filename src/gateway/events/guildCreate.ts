import Client from "../../classes/Client/Client";
import Guild from "../../classes/Guild/Guild";

interface EventDataMember {
    roles: string[];
}

interface PermissionOverwrites {
    id: string;
    type: string;
    allow_new: string;
    deny_new: string;
}

interface EventDataChannel {
    id: string;
    type: number;
    parent_id?: string;
    permission_overwrites: PermissionOverwrites[];
}

interface EventDataRole {
    id: string;
    permissions_new: string;
    position: number;
}

interface EventData {
    id: string;
    joined_at: string;
    channels: EventDataChannel[];
    roles: EventDataRole[];
    members: EventDataMember[];
}

export default function guildCreate(client: Client, data: EventData) {

    // Get joined at
    const joinedAt: Date = new Date(data.joined_at);

    // Create guild
    const guild: Guild = new Guild(client, {
        id: data.id,
        channels: data.channels,
        rawRoles: data.roles,
        roles: new Map(),
        myRoles: data.members[0].roles,
        joinedAt
    });

    // Guilds are loading
    if (client.loadingGuilds) {

        // Remove from loading guilds
        client.loadingGuilds.delete(guild.id);

        // If all guilds are loaded, emit the `ready` event
        if (client.loadingGuilds.size === 0) client.emit("ready");
    }

    /**
     * Ignore non new servers
     *
     * This event fires when the bot connects to the websocket for every guild its in
     * It also fires when a guild becomes available
     *
     * We can check if the guild is new or not by checking the joined timestamp
     * 300,000 ms (5 minutes) is the threshold were using
     */
    if (joinedAt.getTime() < Date.now() - 300000) return;

    // Emit event
    client.emit("guildCreate", guild);
}