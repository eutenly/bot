import { RawMessage } from "../../classes/Channel/Channel";
import Command from "../../classes/Command/Command";
import UserRequest from "../../classes/UserRequest/UserRequest";
import search from "./searchOverview/main";

export default async function searchLastMessage(userRequest: UserRequest): Promise<Command | undefined> {

    // Get last message
    const lastMessage: RawMessage | undefined = await userRequest.channel.getLastMessage(userRequest.source);

    // No message
    if (!lastMessage) {
        userRequest.respond(":x:  **|  There haven't been any messages recently**");
        return;
    }

    // Search
    return search(userRequest, lastMessage.content);
}