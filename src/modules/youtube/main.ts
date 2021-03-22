import UserRequest from "../../classes/UserRequest/UserRequest";
import helpEmbed from "./helpEmbed";
import linkChecker from "./linkChecker";
import search from "./search/main";

export default async function main(userRequest: UserRequest) {

    // Get params
    const input: string | undefined = userRequest.getParameter<string>("search-query");

    // No input
    if (!input) return userRequest.respond(helpEmbed);

    // Link checker
    const runModule: Function | undefined = linkChecker(input);
    if (runModule) return await runModule(userRequest);

    // Search
    await search(userRequest, input);
}