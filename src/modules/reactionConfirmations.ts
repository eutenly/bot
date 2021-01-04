import UserRequest from "../classes/UserRequest/UserRequest";

export default async function reactionConfirmations(userRequest: UserRequest) {

    // Get params
    const enabled: boolean | undefined = userRequest.getParameter<boolean>("mode");

    // Invalid input
    if (enabled === undefined) return userRequest.respond(":x:  **|  Please enter if you'd like reaction confirmation messages to be enabled or disabled**");

    // Set reaction confirmations
    userRequest.user.setReactionConfirmations(enabled);

    // Send
    userRequest.respond(`:white_check_mark:  **|  Reaction confirmation messages are now ${enabled ? "enabled" : "disabled"}**`);
}