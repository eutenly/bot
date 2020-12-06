import { CompactMode } from "../../models/servers";
import Channel from "../Channel/Channel";
import Client, { ServerData } from "../Client/Client";
import FetchQueue from "../FetchQueue/FetchQueue";
import calculateBotPermissions, { PartialPermissionsGuildData } from "./calculateBotPermissions";
import findChannel from "./findChannel";
import getChannels from "./getChannels";
import getMember from "./getMember";
import getPermissions, { GuildPermissions, GuildPermissionsInputData } from "./getPermissions";
import getRoles from "./getRoles";
import setCompactMode from "./setCompactMode";
import setPrefix from "./setPrefix";

export interface PermissionOverwrites {
    id: string;
    type: string;
    position?: number;
    allow_new: string;
    deny_new: string;
}

export interface GuildDataChannel {
    id: string;
    type: number;
    name: string;
    parent_id?: string;
    permission_overwrites: PermissionOverwrites[];
}

export interface GuildDataRole {
    id: string;
    permissions_new: string;
    position: number;
}

export interface GuildDataMember {
    roles: string[];
}

export interface GuildData {
    id: string;
    name: string;
    ownerID: string;
    channels: GuildDataChannel[];
    rawRoles: GuildDataRole[];
    roles: Map<string, GuildDataRole>;
    myRoles: string[];
    joinedAt: Date;
    data: ServerData;
}

interface GuildFetchQueue {
    getChannels: FetchQueue;
    getRoles: FetchQueue;
    getMember: FetchQueue;
}

export default class Guild {

    // The client
    client: Client;

    // Data about the guild
    id: string;
    joinedAt: Date;
    prefix?: string;

    // Compact mode
    compactMode: Map<string, boolean>;

    /**
     * The server's name
     *
     * This property is only set on guild create, it isn't updated
     */
    name: string;

    /**
     * The owner's user ID
     *
     * This property is only set on guild create, it isn't updated
     */
    ownerID: string;

    // Channel names
    channelNames: Map<string, string>;

    // Members perms
    memberPerms: Map<string, GuildPermissions>;

    // A map of channel IDs mapped to a bitfield of permissions in that channel
    permissions: Map<string, number>;
    processBotPermissions: boolean;
    processingBotPermissions: boolean;

    // Fetch queues
    fetchQueues: GuildFetchQueue;

    // Constructor
    constructor(client: Client, data: GuildData) {

        // Set data
        this.client = client;

        this.id = data.id;
        this.name = data.name;
        this.ownerID = data.ownerID;
        this.joinedAt = data.joinedAt;
        this.prefix = data.data.prefix;

        // Channel names
        this.channelNames = new Map();
        data.channels.filter((c: GuildDataChannel) => ![2, 4].includes(c.type)).forEach((c: GuildDataChannel) => this.channelNames.set(c.id, c.name));

        // Member perms
        this.memberPerms = new Map();

        // Compact mode
        this.compactMode = new Map();
        data.data.compactMode.forEach((c: CompactMode) => this.compactMode.set(c.channelID, c.enabled));

        // Set fetch queues
        this.fetchQueues = {
            getChannels: new FetchQueue(client),
            getRoles: new FetchQueue(client),
            getMember: new FetchQueue(client)
        };

        // Calculate permissions
        this.permissions = new Map();
        this.processBotPermissions = false;
        this.processingBotPermissions = false;
        this.calculateBotPermissions(data);

        // Cache guild
        this.client.guilds.set(this.id, this);
    }

    // Calculate the permissions for the bot in all the channels in this guild
    calculateBotPermissions = (data?: PartialPermissionsGuildData): Promise<void> => calculateBotPermissions(this, data);

    // Set prefix
    setPrefix = (prefix: string) => setPrefix(this, prefix);

    // Set compact mode for a channel
    setCompactMode = (channels: string | string[], enabled: boolean) => setCompactMode(this, channels, enabled);

    // Get all the channels in this guild
    getChannels = (): Promise<GuildDataChannel[]> => getChannels(this);

    // Get all the roles in this guild
    getRoles = (): Promise<GuildDataRole[]> => getRoles(this);

    // Get a member from this guild
    getMember = (userID: string): Promise<GuildDataMember> => getMember(this, userID);

    // Find a channel by ID or name
    findChannel = (input: string, channels?: GuildDataChannel[]): Promise<Channel | undefined> => findChannel(this, input, channels);

    // Get a member's permissions in this guild
    getPermissions = (data: GuildPermissionsInputData): Promise<GuildPermissions> => getPermissions(this, data);

    // Leave this guild
    leave = (reason?: string): Promise<void> => this.client.leaveGuild(this, reason);
}