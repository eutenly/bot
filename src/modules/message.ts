import Message from "../classes/Message/Message";
import router from "./commandRouter/router";

export default function messageHandler(message: Message) {

    // Run router
    const commandRun: boolean = router(message);

    /**
     * Uncache Message
     *
     * If the message doesn't run a command and it isn't sent by the client, uncache it
     */
    if ((!commandRun) && (message.author.id !== message.client.id)) message.uncache();
}