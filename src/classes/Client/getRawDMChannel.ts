import Client from "./Client";

export default async function getRawDMChannel(client: Client, userID: string): Promise<any> {

    // Add to fetch queue
    const rawChannel: any = await client.fetchQueues.getDMChannel.request("/users/@me/channels", {
        method: "POST",
        body: {
            recipient_id: userID
        }
    });

    // Return
    return rawChannel;
}