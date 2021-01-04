import { ViewData } from "../../classes/Command/Command";
import UserRequest from "../../classes/UserRequest/UserRequest";
import { SavedLink } from "../../models/users";
import website from "../website/website/main";

export default function view(data: SavedLink[], userRequest: UserRequest): ViewData | undefined {

    // Get params
    const input: string | undefined = userRequest.getParameter<string>("result") || userRequest.getParameter<string>("link-or-result");
    if (!input) return { error: ":x:  **|  Which result would you like to view?**" };

    // Get result number
    const resultNumber: number = parseInt(input);
    if ((!resultNumber) || (resultNumber < 1)) return { error: ":x:  **|  That result number is invalid**" };

    // Get result
    const result: SavedLink = data[resultNumber - 1];
    if (!result) return { error: ":x:  **|  That result number is invalid**" };

    // View website
    return {
        module: () => website(userRequest, result.url)
    };
}