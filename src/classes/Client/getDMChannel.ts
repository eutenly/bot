import Channel from "../Channel/Channel";
import Client from "./Client";

export default async function getDMChannel(client: Client, userID: string): Promise<Channel> {

    // Add to fetch queue
    const rawChannel: any = await client.fetchQueues.getDMChannel.request("/users/@me/channels", {
        method: "POST",
        body: {
            recipient_id: userID
        }
    });

    // Create channel
    const channel: Channel = client.channels.get(rawChannel.id) || new Channel(client, {
        id: rawChannel.id
    });

    // Return
    return channel;
}