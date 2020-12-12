import { EmbedData } from "../Embed/Embed";
import Message from "../Message/Message";
import UserRequest from "./UserRequest";

export default async function reply(userRequest: UserRequest, content: string | EmbedData, embed?: EmbedData): Promise<Message> {

    // Send message
    if (userRequest.source instanceof Message) {
        return await userRequest.source.channel.sendMessage(content, embed);
    }

    // Reply to interaction
    else {
        return await userRequest.source.reply(content, embed);
    }
}