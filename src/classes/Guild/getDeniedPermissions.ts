import Guild, { GuildDataChannel, GuildDataMember, GuildDataRole } from "./Guild";
import calculateDeniedPermissions, { DeniedPermissionsData } from "./calculateDeniedPermissions";

export default async function getDeniedPermissions(guild: Guild, userID: string, channelData?: GuildDataChannel): Promise<number> {

    // Get role data
    let roleData: GuildDataRole[] = await guild.getRoles();

    // Get member data
    const memberData: GuildDataMember = await guild.getMember(userID);

    // Calculate denied permissions
    const deniedPermissionsData: DeniedPermissionsData = calculateDeniedPermissions(guild, {
        channels: channelData ? [channelData] : [],
        roles: roleData,
        userID,
        memberRoles: memberData.roles
    });

    // Return
    return channelData ? (deniedPermissionsData.deniedPermissions.get(channelData.id) || 0) : deniedPermissionsData.guildDeniedPermissions;
}