import Guild, { GuildDataChannel, GuildDataMember, GuildDataRole } from "./Guild";
import calculatePermissionOverwrites from "./calculatePermissionOverwrites";

export interface GuildPermissionsInputData {
    channels?: GuildDataChannel[];
    roles?: GuildDataRole[];
    userID: string;
    memberRoles?: string[];
}

export interface GuildPermissionsData {
    channels: GuildDataChannel[];
    roles: GuildDataRole[];
    userID: string;
    memberRoles: string[];
}

export interface Permissions {
    [key: string]: number;
}

export interface GuildPermissions {
    permissions: number;
    channels: Map<string, number>;
}

export default async function getPermissions(guild: Guild, data: GuildPermissionsInputData): Promise<GuildPermissions> {

    // Get channel data
    let channelData: Promise<GuildDataChannel[]> | undefined;
    if (!data.channels) channelData = guild.getChannels();

    // Get role data
    let roleData: Promise<GuildDataRole[]> | undefined;
    if (!data.roles) roleData = guild.getRoles();

    // Get member data
    let memberData: Promise<GuildDataMember> | undefined;
    if (!data.memberRoles) memberData = guild.getMember(data.userID);

    /**
     * Define not in guild
     *
     * If the bot is kicked, sometimes discord will fire role/channel delete events, causing the bot to try to fetch permissions
     */
    let notInGuild: boolean = false;

    // Set data
    if (channelData) data.channels = await channelData.catch(() => notInGuild = true) as GuildDataChannel[];
    if (roleData) data.roles = await roleData.catch(() => notInGuild = true) as GuildDataRole[];
    if (memberData) data.memberRoles = (await memberData.catch(() => notInGuild = true) as GuildDataMember | undefined)?.roles;

    // Not in guild
    if (notInGuild) throw new Error("Bot isn't in guild");

    // Typecast `GuildPermissionsInputData` to `GuildPermissionsData`
    const permissionsData: GuildPermissionsData = data as GuildPermissionsData;

    // Add the @everyone role to `memberRoles`
    // The @everyone role ID is the same as the guild ID
    permissionsData.memberRoles.push(guild.id);

    // Filter roles to only include roles the member has
    permissionsData.roles = permissionsData.roles.filter((r: GuildDataRole) => permissionsData.memberRoles.includes(r.id));

    // Sort roles by position
    permissionsData.roles = permissionsData.roles.sort((a, b) => a.position - b.position);

    // Parse `roles` into role IDs mapped to `GuildDataRole`s
    let roles: Map<string, GuildDataRole> = new Map();
    permissionsData.roles.forEach((r: GuildDataRole) => roles.set(r.id, r));

    // Define permissions
    const PERMISSIONS: Permissions = {
        MANAGE_GUILD: 0x20
    };

    // Define all permissions
    const ALL_PERMISSIONS: number = Object.values(PERMISSIONS).reduce((all, intent) => all | intent);

    // Define channel permissions
    const CHANNEL_PERMISSIONS: Permissions = {
        MANAGE_CHANNEL: 0x10,
        ADD_REACTIONS: 0x40,
        VIEW_CHANNEL: 0x400,
        SEND_MESSAGES: 0x800,
        MANAGE_MESSAGES: 0x2000,
        EMBED_LINKS: 0x4000,
        READ_MESSAGE_HISTORY: 0x10000,
        USE_EXTERNAL_EMOJIS: 0x40000
    };

    // Define all channel permissions
    const ALL_CHANNEL_PERMISSIONS: number = Object.values(CHANNEL_PERMISSIONS).reduce((all, intent) => all | intent);

    // Loop through the roles that the member has
    // If there's a role that has admin perms, assume that all perms are allowed
    for (let r of permissionsData.roles) {

        // Parse permissions into integers
        const perms = parseInt(r.permissions_new);

        // If the (allowed) permissions include the admin permission, assume that all perms are allowed
        if ((perms & 0x8) === 0x8) {

            const channels: Map<string, number> = new Map();
            permissionsData.channels.forEach((c: GuildDataChannel) => channels.set(c.id, ALL_CHANNEL_PERMISSIONS));

            return {
                permissions: ALL_PERMISSIONS,
                channels
            };
        }
    }

    // Define permissions
    let permissions: number = 0;

    // Loop through the roles that the member has
    permissionsData.roles.forEach((r: GuildDataRole) => {

        // Parse permissions into integers
        const perms = parseInt(r.permissions_new);

        // Loop through permissions
        for (let permission in PERMISSIONS) {

            // If the (allowed) permissions include the permission, add it to the (guild) permissions
            if ((perms & PERMISSIONS[permission]) === PERMISSIONS[permission]) permissions |= PERMISSIONS[permission];
        }
    });

    // Define channel permissions
    const channels: Map<string, number> = new Map();

    // Calculate denied permissions for channels
    permissionsData.channels.forEach((c: GuildDataChannel) => {

        // Ignore non text channels
        if ([2, 4].includes(c.type)) return;

        // Define channel permissions
        let channelPermissions: number = 0;

        // Loop through the roles that the member has
        permissionsData.roles.forEach((r: GuildDataRole) => {

            // Parse permissions into integers
            const perms = parseInt(r.permissions_new);

            // Loop through permissions
            for (let permission in CHANNEL_PERMISSIONS) {

                // If the (allowed) permissions include the permission, add it to the channel permissions
                if ((perms & CHANNEL_PERMISSIONS[permission]) === CHANNEL_PERMISSIONS[permission]) channelPermissions |= CHANNEL_PERMISSIONS[permission];
            }
        });

        // If the channel has a parent, we need to process its permission overwrites
        if (c.parent_id) {

            // Get parent channel
            const parentChannel = permissionsData.channels.find((cc: GuildDataChannel) => cc.id === c.parent_id);

            // Calculate permission overwrites
            if (parentChannel) channelPermissions = calculatePermissionOverwrites(data.userID, roles, channelPermissions, parentChannel.permission_overwrites, CHANNEL_PERMISSIONS);
        }

        // Calculate permission overwrites
        channelPermissions = calculatePermissionOverwrites(data.userID, roles, channelPermissions, c.permission_overwrites, CHANNEL_PERMISSIONS);

        // Set denied permissions
        if (channelPermissions !== 0) channels.set(c.id, channelPermissions);
    });

    // Return
    return {
        permissions,
        channels
    };
}