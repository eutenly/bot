import Command from "../classes/Command/Command";
import UserRequest from "../classes/UserRequest/UserRequest";

export default async function page(userRequest: UserRequest, type?: "next" | "previous") {

    // Get params
    const amount: number = userRequest.getParameter<number>("amount") || userRequest.getParameter<number>("page") || 1;

    // Get command
    const command: Command | undefined = userRequest.user.command;
    if ((!command) || (!command.pageManager)) return userRequest.respond(":x:  **|  You haven't searched anything recently**");

    // Get page
    let page: number = command.pageManager.page || 1;
    if (type === "next") page = page + amount;
    else if (type === "previous") page = page - amount;
    else page = amount;

    // Set page
    command.pageManager.setPage(page);
}