import Guild from "../Guild/Guild";
import Client from "./Client";

export default async function leaveGuild(client: Client, guild: Guild, reason?: string): Promise<void> {

    // DM owner the reason for leaving
    if (reason) {

        // Get owner DM channel
        const ownerDM = await client.getDMChannel(guild.ownerID);

        // Send
        await ownerDM.sendMessage(reason).catch(() => { });
    }

    // Add to fetch queue
    await client.fetchQueues.leaveGuild.request(`/users/@me/guilds/${guild.id}`, {
        method: "DELETE"
    });
}