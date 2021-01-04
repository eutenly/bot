import UserRequest from "../classes/UserRequest/UserRequest";

export default async function support(userRequest: UserRequest) {

    // Send
    userRequest.respond(`<:eutenly:${userRequest.client.eutenlyEmojis.get("eutenly")}>  **|  Join my support server at** https://discord.gg/feE2vaR`);
}