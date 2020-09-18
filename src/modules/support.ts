import Message from "../classes/Message/Message";

export default async function support(message: Message) {

    // Send
    message.channel.sendMessage(`<:eutenly:${message.client.eutenlyEmojis.get("eutenly")}>  **|  Join my support server at** https://discord.gg/feE2vaR`);
}