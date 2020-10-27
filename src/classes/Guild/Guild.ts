import Channel from "../Channel/Channel";
import Client, { ServerData } from "../Client/Client";
import FetchQueue from "../FetchQueue/FetchQueue";
import calculateBotPermissions, { PartialPermissionsGuildData } from "./calculateBotPermissions";
import getChannels from "./getChannels";
import getDeniedPermissions from "./getDeniedPermissions";
import getMember from "./getMember";
import getRoles from "./getRoles";

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

    // A map of channel IDs mapped to a bitfield of denied permissions in that channel
    deniedPermissions: Map<string, number>;
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

        // Set fetch queues
        this.fetchQueues = {
            getChannels: new FetchQueue(client),
            getRoles: new FetchQueue(client),
            getMember: new FetchQueue(client)
        };

        // Calculate denied permissions
        this.deniedPermissions = new Map();
        this.processBotPermissions = false;
        this.processingBotPermissions = false;
        this.calculateBotPermissions(data);

        // Cache guild
        this.client.guilds.set(this.id, this);
    }

    // Calculate the denied permissions for the bot in all the channels in this guild
    calculateBotPermissions = (data?: PartialPermissionsGuildData): Promise<void> => calculateBotPermissions(this, data);

    // Get all the channels in this guild
    getChannels = (): Promise<GuildDataChannel[]> => getChannels(this);

    // Get all the roles in this guild
    getRoles = (): Promise<GuildDataRole[]> => getRoles(this);

    // Get a member from this guild
    getMember = (userID: string): Promise<GuildDataMember> => getMember(this, userID);

    // Get a member's denied permissions in a channel
    getDeniedPermissions = (userID: string, channelData: GuildDataChannel): Promise<number> => getDeniedPermissions(this, userID, channelData);

    // Leave this guild
    leave = (reason?: string): Promise<void> => this.client.leaveGuild(this, reason);
}