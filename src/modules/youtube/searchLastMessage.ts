import { RawMessage } from "../../classes/Channel/Channel";
import Command from "../../classes/Command/Command";
import Message from "../../classes/Message/Message";
import search from "./search/main";

export default async function searchLastMessage(message: Message): Promise<Command | undefined> {

    // Get last message
    const lastMessage: RawMessage | undefined = await message.getLastMessage();

    // No message
    if (!lastMessage) {
        message.channel.sendMessage(":x:  **|  There haven't been any messages recently**");
        return;
    }

    // Search
    return search(message, lastMessage.content);
}