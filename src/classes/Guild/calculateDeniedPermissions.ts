import Guild, { GuildDataChannel, GuildDataRole } from "./Guild";
import calculatePermissionOverwrites from "./calculatePermissionOverwrites";

export interface PermissionsGuildData {
    channels: GuildDataChannel[];
    roles: GuildDataRole[];
    userID: string;
    memberRoles: string[];
}

export interface Permissions {
    [key: string]: number;
}

export interface DeniedPermissionsData {
    deniedPermissions: Map<string, number>;
    guildDeniedPermissions: number;
}

export default function calculateDeniedPermissions(guild: Guild, data: PermissionsGuildData): DeniedPermissionsData {

    // Add the @everyone role to `memberRoles`
    // The @everyone role ID is the same as the guild ID
    data.memberRoles.push(guild.id);

    // Filter roles to only include roles the member has
    data.roles = data.roles.filter((r: GuildDataRole) => data.memberRoles.includes(r.id));

    // Sort roles by position
    data.roles = data.roles.sort((a, b) => a.position - b.position);

    // Parse `roles` into role IDs mapped to `GuildDataRole`s
    let roles: Map<string, GuildDataRole> = new Map();
    data.roles.forEach((r: GuildDataRole) => roles.set(r.id, r));

    // Loop through the roles that the member has
    // If there's a role that has admin perms, assume that no perms are denied
    for (let r of data.roles) {

        // Parse permissions into integers
        const perms = parseInt(r.permissions_new);

        // If the (allowed) permissions include the admin permission, assume that no perms are denied
        if ((perms & 0x8) === 0x8) return {
            deniedPermissions: new Map(),
            guildDeniedPermissions: 0
        };
    }

    // Define permissions
    const PERMISSIONS: Permissions = {
        MANAGE_CHANNEL: 0x10,
        ADD_REACTIONS: 0x40,
        VIEW_CHANNEL: 0x400,
        SEND_MESSAGES: 0x800,
        MANAGE_MESSAGES: 0x2000,
        EMBED_LINKS: 0x4000,
        READ_MESSAGE_HISTORY: 0x10000,
        USE_EXTERNAL_EMOJIS: 0x40000
    };

    // Define denied permissions
    const deniedPermissions: Map<string, number> = new Map();

    // Define guild permissions
    const GUILD_PERMISSIONS: Permissions = {
        MANAGE_GUILD: 0x20
    };

    /**
     * Define denied permissions for this guild
     *
     * Start by assuming that all permissions are denied
     * As we process permissions, the ones that are found to be allowed will be removed from this list
     */
    let guildDeniedPermissions: number = Object.values(GUILD_PERMISSIONS).reduce((all, intent) => all | intent);

    // Loop through the roles that the member has
    data.roles.forEach((r: GuildDataRole) => {

        // Parse permissions into integers
        const perms = parseInt(r.permissions_new);

        // Loop through permissions
        for (let permission in PERMISSIONS) {

            // If the (allowed) permissions include the permission, remove it from the denied permissions
            if ((perms & PERMISSIONS[permission]) === PERMISSIONS[permission]) guildDeniedPermissions &= ~PERMISSIONS[permission];
        }
    });

    // Calculate denied permissions
    data.channels.forEach((c: GuildDataChannel) => {

        // Ignore non text channels
        if ([2, 4].includes(c.type)) return;

        /**
         * Define denied permissions for this channel
         *
         * Start by assuming that all permissions are denied
         * As we process permissions, the ones that are found to be allowed will be removed from this list
         */
        let thisDeniedPermissions: number = Object.values(PERMISSIONS).reduce((all, intent) => all | intent);

        // Loop through the roles that the member has
        data.roles.forEach((r: GuildDataRole) => {

            // Parse permissions into integers
            const perms = parseInt(r.permissions_new);

            // Loop through permissions
            for (let permission in PERMISSIONS) {

                // If the (allowed) permissions include the permission, remove it from the denied permissions
                if ((perms & PERMISSIONS[permission]) === PERMISSIONS[permission]) thisDeniedPermissions &= ~PERMISSIONS[permission];
            }
        });

        // If the channel has a parent, we need to process its permission overwrites
        if (c.parent_id) {

            // Get parent channel
            const parentChannel = data.channels.find((cc: GuildDataChannel) => cc.id === c.parent_id);

            // Calculate permission overwrites
            if (parentChannel) thisDeniedPermissions = calculatePermissionOverwrites(guild, data.userID, roles, thisDeniedPermissions, parentChannel.permission_overwrites, PERMISSIONS);
        }

        // Calculate permission overwrites
        thisDeniedPermissions = calculatePermissionOverwrites(guild, data.userID, roles, thisDeniedPermissions, c.permission_overwrites, PERMISSIONS);

        // Set denied permissions
        if (thisDeniedPermissions !== 0) deniedPermissions.set(c.id, thisDeniedPermissions);
    });

    // Return
    return {
        deniedPermissions,
        guildDeniedPermissions
    };
}