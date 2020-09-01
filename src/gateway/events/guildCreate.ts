import Channel from "../../classes/Channel/Channel";
import Client, { ServerData } from "../../classes/Client/Client";
import Guild from "../../classes/Guild/Guild";

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

interface EventDataMember {
    roles: string[];
}

interface EventDataEmoji {
    id: string;
    name: string;
}

interface EventData {
    id: string;
    name: string;
    owner_id: string;
    joined_at: string;
    channels: EventDataChannel[];
    roles: EventDataRole[];
    members: EventDataMember[];
    emojis: EventDataEmoji[];
}

export default function guildCreate(client: Client, data: EventData) {

    // Guilds are loading
    let serverData: ServerData | undefined;
    if (client.loadingGuilds) {

        // Log
        client.loadingGuildsProgressBar.startItem(data.id);

        // Get server data
        serverData = client.loadingGuilds.get(data.id);
    }

    // Get joined at
    const joinedAt: Date = new Date(data.joined_at);

    // Create guild
    const guild: Guild = new Guild(client, {
        id: data.id,
        name: data.name,
        ownerID: data.owner_id,
        channels: data.channels,
        rawRoles: data.roles,
        roles: new Map(),
        myRoles: data.members[0].roles,
        joinedAt,
        data: serverData || {}
    });

    // Check if the guild is Eutenland
    if (guild.id === "733725629769318461") {

        // Set Eutenland data
        client.eutenland = guild;
        client.serverJoinLeave = new Channel(client, {
            id: "733764217559187497",
            guildID: guild.id
        });

        // Set Eutenly emojis
        data.emojis.forEach((e: EventDataEmoji) => client.eutenlyEmojis.set(e.name, e.id));
    }

    // Guilds are loading
    if (client.loadingGuilds) {

        // Remove from loading guilds
        client.loadingGuilds.delete(guild.id);

        // Log
        client.loadingGuildsProgressBar.itemDone(guild.id);

        // All guilds are loaded
        if (client.loadingGuilds.size === 0) {

            // Unset loading guilds
            client.loadingGuilds = undefined;

            // Emit the `ready` event
            client.emit("ready");
        }
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