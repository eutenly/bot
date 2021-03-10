import UserRequest from "../../classes/UserRequest/UserRequest";
import helpEmbed from "./helpEmbed";
import search from "./search";
import searchLastMessage from "./searchLastMessage";

export default async function main(userRequest: UserRequest) {

    // Get prefix
    const prefix: string = userRequest.channel.prefix;

    // Get params
    const query: string | undefined = userRequest.getParameter<string>("search-query");

    // No query
    if (!query) return userRequest.respond(helpEmbed(prefix));

    // Check if input is to search last message
    if (query === "^") return await searchLastMessage(userRequest);

    // Run module
    await search(userRequest, query);
}