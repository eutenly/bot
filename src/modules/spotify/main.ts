import UserRequest from "../../classes/UserRequest/UserRequest";
import home from "./home/main";
import linkChecker from "./linkChecker";
import searchOverview from "./searchOverview/main";

export default async function main(userRequest: UserRequest) {

    // Get input
    const input: string | undefined = userRequest.getParameter<string>("search-query");

    // No input
    if (!input) return home(userRequest);

    // Link checker
    const runModule: Function | undefined = linkChecker(input);
    if (runModule) return await runModule(userRequest);

    // Search overview
    await searchOverview(userRequest, input);
}