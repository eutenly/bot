import Channel from "../Channel/Channel";
import Client from "./Client";

export default async function getDMChannel(client: Client, userID: string): Promise<Channel> {

    // Get raw DM channel
    const rawChannel: any = await client.getRawDMChannel(userID);

    // Create channel
    const channel: Channel = client.channels.get(rawChannel.id) || new Channel(client, {
        id: rawChannel.id
    });

    // Return
    return channel;
}