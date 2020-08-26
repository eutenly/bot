import Client from "../../classes/Client";
import Guild from "../../classes/Guild";

interface GuildCreateEventData {
    id: string;
    joined_at: string;
}

export default function guildCreate(client: Client, data: GuildCreateEventData) {

    // Get joined at
    const joinedAt: Date = new Date(data.joined_at);

    // Create guild
    const guild: Guild = new Guild(client, {
        id: data.id,
        joinedAt
    });

    /**
     * Ignore non new servers
     *
     * This event fires when the bot connects to the websocket for every guild its in
     * It also fires when a guild becomes available
     *
     * We can check if the guild is new or not by checking the joined timestamp
     * 300,000 ms (5 minutes) is the threshold were using
     */
    if (joinedAt.getTime() < Date.now() - 300000) return;

    // Emit event
    client.emit("guildCreate", guild);
}