import UserRequest from "../classes/UserRequest/UserRequest";
import { Users } from "../models";

export default async function badge(userRequest: UserRequest) {

    // Get params
    const target: string | undefined = userRequest.getParameter<string>("target");
    let action: boolean | undefined = userRequest.getParameter<boolean>("action");
    let badge: string | undefined = userRequest.getParameter<string>("badge")?.toLowerCase();

    // Invalid params
    if (!target) return userRequest.respond(":x:  **|  Which user would you like to modify a badge for?**");
    if (!badge) return userRequest.respond(":x:  **|  Which badge would you like to modify?**");

    // Parse type
    badge = badge === "suggester" ? "suggester" : "bugHunter";

    // Update database
    const updated = await Users.findByIdAndUpdate(target, action ? { [badge]: true } : { $unset: { [badge]: 1 } });

    // No user
    if (!updated) return userRequest.respond(":x:  **|  I couldn't find that user**");

    // Send
    userRequest.respond(`:white_check_mark:  **|  The ${badge === "suggester" ? "Suggester" : "Bug Hunter"} badge has been ${action ? "added to" : "removed from"} <@${target}>**`);
}