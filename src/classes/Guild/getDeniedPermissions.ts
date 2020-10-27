import Guild, { GuildDataChannel, GuildDataMember, GuildDataRole } from "./Guild";
import calculateDeniedPermissions from "./calculateDeniedPermissions";

export default async function getDeniedPermissions(guild: Guild, userID: string, channelData: GuildDataChannel): Promise<number> {

    // Get role data
    let roleData: GuildDataRole[] = await guild.getRoles();

    // Get member data
    const memberData: GuildDataMember = await guild.getMember(userID);

    // Return denied permissions
    return calculateDeniedPermissions(guild, {
        channels: [channelData],
        roles: roleData,
        userID,
        memberRoles: memberData.roles
    }).get(channelData.id) || 0;
}