import Guild, { GuildDataChannel, GuildDataMember, GuildDataRole } from "./Guild";
import calculatePermissionOverwrites from "./calculatePermissionOverwrites";

export interface PartialPermissionsGuildData {
    channels?: GuildDataChannel[];
    rawRoles?: GuildDataRole[];
    myRoles?: string[];
}

export interface PermissionsGuildData {
    channels: GuildDataChannel[];
    rawRoles: GuildDataRole[];
    roles: Map<string, GuildDataRole>;
    myRoles: string[];
}

export interface Permissions {
    [key: string]: number;
}

export default async function calculateDeniedPermissions(guild: Guild, rawData: PartialPermissionsGuildData = {}) {

    // If it's already processing denied permissions, set `processDeniedPermissions` to true
    // This will cause it to calculate denied permissions again once it's done, in case there was another update to the perms
    if (guild.processingDeniedPermissions) {

        // Set process denied permissions
        guild.processDeniedPermissions = true;

        return;
    }

    // Set processing denied permissions
    guild.processingDeniedPermissions = true;

    // Get channel data
    let channelData: Promise<GuildDataChannel[]> | undefined;
    if (!rawData.channels) channelData = guild.getChannels();

    // Get role data
    let roleData: Promise<GuildDataRole[]> | undefined;
    if (!rawData.rawRoles) roleData = guild.getRoles();

    // Get bot's member data
    let selfData: Promise<GuildDataMember> | undefined;
    if (!rawData.myRoles) selfData = guild.getMember(guild.client.id);

    // Set data
    if (channelData) rawData.channels = await channelData;
    if (roleData) rawData.rawRoles = await roleData;
    if (selfData) rawData.myRoles = (await selfData).roles;

    const data: PermissionsGuildData = {
        channels: rawData.channels || [],
        rawRoles: rawData.rawRoles || [],
        roles: new Map(),
        myRoles: rawData.myRoles || []
    };

    // Add the @everyone role to `myRoles`
    // The @everyone role ID is the same as the guild ID
    data.myRoles.push(guild.id);

    // Filter raw roles to only include roles the bot has
    data.rawRoles = data.rawRoles.filter((r: GuildDataRole) => data.myRoles.includes(r.id));

    // Sort roles by position
    data.rawRoles = data.rawRoles.sort((a, b) => a.position - b.position);

    // Parse `rawRoles` into role IDs mapped to `GuildDataRole`s
    data.rawRoles.forEach((r: GuildDataRole) => data.roles.set(r.id, r));

    // Loop through the roles that the bot has
    // If there's a role that has admin perms, assume that no perms are denied
    for (let r of data.rawRoles) {

        // Parse permissions into integers
        const perms = parseInt(r.permissions_new);

        // If the (allowed) permissions include the admin permission, remove all denied permissions and return
        if ((perms & 0x8) === 0x8) {

            guild.deniedPermissions = new Map();

            return;
        }
    }

    // Define permissions
    const PERMISSIONS: Permissions = {
        ADD_REACTIONS: 0x40,
        VIEW_CHANNEL: 0x400,
        SEND_MESSAGES: 0x800,
        EMBED_LINKS: 0x4000,
        READ_MESSAGE_HISTORY: 0x10000,
        USE_EXTERNAL_EMOJIS: 0x40000
    };

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
        let deniedPermissions: number = Object.values(PERMISSIONS).reduce((all, intent) => all | intent);

        // Loop through the roles that the bot has
        data.rawRoles.forEach((r: GuildDataRole) => {

            // Parse permissions into integers
            const perms = parseInt(r.permissions_new);

            // Loop through permissions
            for (let permission in PERMISSIONS) {

                // If the (allowed) permissions include the permission, remove it from the denied permissions
                if ((perms & PERMISSIONS[permission]) === PERMISSIONS[permission]) deniedPermissions &= ~PERMISSIONS[permission];
            }
        });

        // If the channel has a parent, we need to process its permission overwrites
        if (c.parent_id) {

            // Get parent channel
            const parentChannel = data.channels.find((cc: GuildDataChannel) => cc.id === c.parent_id);

            // Calculate permission overwrites
            if (parentChannel) deniedPermissions = calculatePermissionOverwrites(guild, data, deniedPermissions, parentChannel.permission_overwrites, PERMISSIONS);
        }

        // Calculate permission overwrites
        deniedPermissions = calculatePermissionOverwrites(guild, data, deniedPermissions, c.permission_overwrites, PERMISSIONS);

        // Set denied permissions
        if (deniedPermissions !== 0) guild.deniedPermissions.set(c.id, deniedPermissions);
        else guild.deniedPermissions.delete(c.id);
    });

    // Set processing denied permissions
    guild.processingDeniedPermissions = false;

    // If `processDeniedPermissions` is true, calculate denied permissions again
    if (guild.processDeniedPermissions) {

        // Set process denied permissions
        guild.processDeniedPermissions = false;

        // Calculate denied permissions
        calculateDeniedPermissions(guild);
    }
}