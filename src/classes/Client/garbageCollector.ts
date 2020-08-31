import Channel from "../Channel/Channel";
import Message from "../Message/Message";
import Client from "./Client";

export default async function activateGarbageCollection(client: Client) {
    // Setup Garbage Collection to run every 60 seconds
    setInterval(function() {
        collectGarbage(client);
    }, 60000);
}

export async function collectGarbage(client: Client) {
    // Cycle through cached channels
    client.channels.forEach(async (channel: Channel) => {

        // Cycle through messages within channel
        channel.messages.forEach(async (message: Message) => {
            // Get Timestamp
            const timestamp = await convertToTimestamp(message.id);

            // Check age of Timestamp
            if (timestamp.getTime() < Date.now() - 600000) {
                // Delete messages older than 10 minutes
                channel.messages.delete(message.id);
            }
        });

        // Check if channels have no cached messages
        if (channel.messages.size === 0) {
            // Delete channel cache
            client.channels.delete(channel.id);
        }
    });
}

async function convertToTimestamp(snowflake: string): Promise<Date> {
    // Convert to Bits
    const id = BigInt.asUintN(64, BigInt(snowflake));
    const dateBits = Number(id >> 22n);

    // Calculate Date with Epoch
    const discordEpoch = 1420070400000;
    const date = new Date(dateBits + discordEpoch);

    return date;
}