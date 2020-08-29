import Guild, { GuildDataMember } from "./Guild";

export default async function getMember(guild: Guild, userID: string): Promise<GuildDataMember> {

    // Add to fetch queue
    const member: any = await guild.fetchQueues.getMember.request(`/guilds/${guild.id}/members/${userID}`);

    // Return
    return member;
}