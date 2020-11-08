import Message from "../Message/Message";
import Channel, { RawMessage } from "./Channel";

export interface FetchMessagesOptions {
    limit?: number;
    before?: Message | string;
    after?: Message | string;
    around?: Message | string;
}

export default async function fetchMessages(channel: Channel, options: FetchMessagesOptions = { limit: 50 }): Promise<RawMessage[]> {

    // Missing perms
    const deniedPermissions: number | undefined = channel.guild?.permissions.get(channel.id);
    if ((deniedPermissions) && ((deniedPermissions & 0x10000) !== 0x10000)) throw new Error("Missing permissions");

    // Parse options
    if (options.before instanceof Message) options.before = options.before.id;
    if (options.after instanceof Message) options.after = options.after.id;
    if (options.around instanceof Message) options.around = options.around.id;

    // Add to fetch queue
    const messages: any = await channel.fetchQueues.fetchMessages.request(`/channels/${channel.id}/messages?limit=${options.limit}${options.before ? `&before=${options.before}` : ""}${options.after ? `&after=${options.after}` : ""}${options.around ? `&around=${options.around}` : ""}`);

    // Return
    return messages;
}