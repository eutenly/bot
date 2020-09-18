import Message from "../../classes/Message/Message";
import linkChecker from "../linkCheckers/spotify";
import home from "./home/main";
import searchOverview from "./searchOverview/main";

export default async function main(message: Message) {

    // Get input
    const input = message.content.split(" ").slice(1).join(" ");

    // No input
    if (!input) return home(message);

    // Link checker
    const runModule: Function | undefined = linkChecker(input);
    if (runModule) return runModule(message);

    // Search overview
    searchOverview(message, input);
}