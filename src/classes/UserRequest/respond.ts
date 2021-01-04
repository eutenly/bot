import { EmbedData } from "../Embed/Embed";
import Message from "../Message/Message";
import UserRequest from "./UserRequest";

export default async function respond(userRequest: UserRequest, content: string | EmbedData, embed?: EmbedData): Promise<Message> {

    // Send message
    if (userRequest.source instanceof Message) {
        return await userRequest.source.channel.sendMessage(content, embed);
    }

    // Respond to interaction
    else {
        return await userRequest.source.respond(content, embed);
    }
}