import Message from "../classes/Message/Message";
import textRouter from "./commandRouter/textRouter";

export default function messageHandler(message: Message) {

    // Run router
    const commandRun: boolean = textRouter(message);

    /**
     * Uncache Message
     *
     * If the message doesn't run a command and it isn't sent by the client, uncache it
     */
    if ((!commandRun) && (message.author.id !== message.client.id)) message.uncache();
}