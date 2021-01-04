import { ViewData } from "../../../classes/Command/Command";
import UserRequest from "../../../classes/UserRequest/UserRequest";
import { ListedVideo } from "../types";
import video, { url as videoURL } from "../video/main";

export default function view(data: ListedVideo[], userRequest: UserRequest): ViewData | undefined {

    // Get params
    const input: string | undefined = userRequest.getParameter<string>("result") || userRequest.getParameter<string>("link-or-result");
    if (!input) return { error: ":x:  **|  Which result would you like to view?**" };

    // Get result number
    const resultNumber: number = parseInt(input);
    if ((!resultNumber) || (resultNumber < 1)) return { error: ":x:  **|  That result number is invalid**" };

    // Get result
    const result: ListedVideo = data[resultNumber - 1];
    if (!result) return { error: ":x:  **|  That result number is invalid**" };

    // View video
    return {
        module: () => video(userRequest, result.id),
        url: videoURL(result.id)
    };
}