import UserRequest from "../classes/UserRequest/UserRequest";

export default async function invite(userRequest: UserRequest) {

    // Send
    userRequest.respond(`<:eutenly:${userRequest.client.eutenlyEmojis.get("eutenly")}>  **|  Add me at https://eutenly.com/invite**`);
}