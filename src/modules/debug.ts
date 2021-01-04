import UserRequest from "../classes/UserRequest/UserRequest";

export default async function debug(userRequest: UserRequest) {

    // Get params
    const enabled: boolean | undefined = userRequest.getParameter<boolean>("mode");

    // Invalid input
    if (enabled === undefined) return userRequest.respond(":x:  **|  Please enter if you'd like debug mode to be enabled or disabled**");

    // Set debug mode
    userRequest.user.debugMode = enabled;
    if (!userRequest.user.debugMode) delete userRequest.user.debugMode;

    // Send
    userRequest.respond(`:white_check_mark:  **|  Debug mode is now ${enabled ? "enabled" : "disabled"}**`);
}