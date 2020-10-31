import Guild, { GuildDataChannel, GuildDataMember, GuildDataRole } from "./Guild";
import calculateDeniedPermissions, { PermissionsGuildData } from "./calculateDeniedPermissions";

export interface PartialPermissionsGuildData {
    channels?: GuildDataChannel[];
    rawRoles?: GuildDataRole[];
    myRoles?: string[];
}

export interface Permissions {
    [key: string]: number;
}

export default async function calculateBotPermissions(guild: Guild, rawData: PartialPermissionsGuildData = {}) {

    // If it's already processing bot permissions, set `processBotPermissions` to true
    // This will cause it to calculate bot permissions again once it's done, in case there was another update to the perms
    if (guild.processingBotPermissions) {

        // Set process bot permissions
        guild.processBotPermissions = true;

        return;
    }

    // Set processing bot permissions
    guild.processingBotPermissions = true;

    // Get channel data
    let channelData: Promise<GuildDataChannel[]> | undefined;
    if (!rawData.channels) channelData = guild.getChannels();

    // Get role data
    let roleData: Promise<GuildDataRole[]> | undefined;
    if (!rawData.rawRoles) roleData = guild.getRoles();

    // Get bot's member data
    let selfData: Promise<GuildDataMember> | undefined;
    if (!rawData.myRoles) selfData = guild.getMember(guild.client.id);

    /**
     * Define not in guild
     *
     * If the bot is kicked, sometimes discord will fire role/channel delete events
     */
    let notInGuild: boolean = false;

    // Set data
    if (channelData) rawData.channels = await channelData.catch(() => notInGuild = true) as GuildDataChannel[];
    if (roleData) rawData.rawRoles = await roleData.catch(() => notInGuild = true) as GuildDataRole[];
    if (selfData) rawData.myRoles = (await selfData.catch(() => notInGuild = true) as GuildDataMember | undefined)?.roles;

    // Not in guild
    if (notInGuild) return;

    const data: PermissionsGuildData = {
        channels: rawData.channels || [],
        roles: rawData.rawRoles || [],
        userID: guild.client.id,
        memberRoles: rawData.myRoles || []
    };

    // Calculate denied permissions
    guild.deniedPermissions = calculateDeniedPermissions(guild, data).deniedPermissions;

    // Set processing bot permissions
    guild.processingBotPermissions = false;

    // If `processBotPermissions` is true, calculate bot permissions again
    if (guild.processBotPermissions) {

        // Set process bot permissions
        guild.processBotPermissions = false;

        // Calculate bot permissions
        calculateBotPermissions(guild);
    }
}