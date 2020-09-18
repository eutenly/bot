import Message from "../classes/Message/Message";

export default async function invite(message: Message) {

    // Send
    message.channel.sendMessage(`<:eutenly:${message.client.eutenlyEmojis.get("eutenly")}>  **|  Add me at https://eutenly.com/invite**`);
}