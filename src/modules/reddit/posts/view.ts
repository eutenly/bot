import { ViewData } from "../../../classes/Command/Command";
import UserRequest from "../../../classes/UserRequest/UserRequest";
import post, { url as postURL } from "../post/main";
import { ListedPost } from "../types";

export default function view(data: ListedPost[], userRequest: UserRequest): ViewData | undefined {

    // Get params
    const input: string | undefined = userRequest.getParameter<string>("result") || userRequest.getParameter<string>("link-or-result");
    if (!input) return { error: ":x:  **|  Which result would you like to view?**" };

    // Get result number
    const resultNumber: number = parseInt(input);
    if ((!resultNumber) || (resultNumber < 1)) return { error: ":x:  **|  That result number is invalid**" };

    // Get result
    const result: ListedPost = data[resultNumber - 1];
    if (!result) return { error: ":x:  **|  That result number is invalid**" };

    // View post
    return {
        module: () => post(userRequest, result.id, result.subredditName),
        url: postURL(result.id, result.subredditName)
    };
}