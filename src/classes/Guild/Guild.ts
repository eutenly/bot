import Client from "../Client/Client";
import FetchQueue from "../FetchQueue/FetchQueue";
import calculateDeniedPermissions, { PartialPermissionsGuildData } from "./calculateDeniedPermissions";
import getChannels from "./getChannels";
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
    channels: GuildDataChannel[];
    rawRoles: GuildDataRole[];
    roles: Map<string, GuildDataRole>;
    myRoles: string[];
    joinedAt: Date;
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

    // A map of channel IDs mapped to a bitfield of denied permissions in that channel
    deniedPermissions: Map<string, number>;
    processDeniedPermissions: boolean;
    processingDeniedPermissions: boolean;

    // Fetch queues
    fetchQueues: GuildFetchQueue;

    // Constructor
    constructor(client: Client, data: GuildData) {

        // Set data
        this.client = client;

        this.id = data.id;
        this.joinedAt = data.joinedAt;

        // Set fetch queues
        this.fetchQueues = {
            getChannels: new FetchQueue(client),
            getRoles: new FetchQueue(client),
            getMember: new FetchQueue(client)
        };

        // Calculate denied permissions
        this.deniedPermissions = new Map();
        this.processDeniedPermissions = false;
        this.processingDeniedPermissions = false;
        this.calculateDeniedPermissions(data);

        // Cache guild
        this.client.guilds.set(this.id, this);
    }

    // Calculate the denied permissions for all channels in this guild
    calculateDeniedPermissions = (data?: PartialPermissionsGuildData): Promise<void> => calculateDeniedPermissions(this, data);

    // Get all the channels in this guild
    getChannels = (): Promise<GuildDataChannel[]> => getChannels(this);

    // Get all the roles in this guild
    getRoles = (): Promise<GuildDataRole[]> => getRoles(this);

    // Get a member from this guild
    getMember = (userID: string): Promise<GuildDataMember> => getMember(this, userID);
}