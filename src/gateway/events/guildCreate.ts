import Channel from "../../classes/Channel/Channel";
import Client, { ServerData } from "../../classes/Client/Client";
import Guild, { GuildDataMember } from "../../classes/Guild/Guild";
import { Servers } from "../../models";

interface PermissionOverwrites {
    id: string;
    type: string;
    allow_new: string;
    deny_new: string;
}

interface EventDataChannel {
    id: string;
    type: number;
    name: string;
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

export default async function guildCreate(client: Client, data: EventData) {

    // Log
    if (client.loadingGuilds) client.loadingGuildsProgressBar.startItem(data.id);

    // Get server data
    let serverData: ServerData = client.loadingGuilds ? client.loadingGuilds.get(data.id) as ServerData : await Servers.findByIdAndUpdate(data.id, {}, { upsert: true, setDefaultsOnInsert: true, new: true }) as ServerData;

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
        data: serverData
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

    // Leave the server if APixel or Maia aren't on the it
    let noAPixel: boolean = false;
    let noMaia: boolean = false;
    await guild.getMember("196795781410324480").catch(() => noAPixel = true);
    await guild.getMember("149862827027464193").catch(() => noMaia = true);
    if ((noAPixel) && (noMaia)) return guild.leave("Eutenly is currently in beta, and you need to be approved to be able to invite the bot to your server. Please join our support server at https://discord.gg/feE2vaR and request approval");

    // Emit event
    client.emit("guildCreate", guild);
}