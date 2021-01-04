import Command, { ViewData } from "../../../classes/Command/Command";
import UserRequest from "../../../classes/UserRequest/UserRequest";
import pr, { url as prURL } from "../pr/main";
import { ListedPR } from "../types";

export default function view(data: ListedPR[], userRequest: UserRequest, command: Command): ViewData | undefined {

    // Get params
    const input: string | undefined = userRequest.getParameter<string>("result") || userRequest.getParameter<string>("link-or-result");
    if (!input) return { error: ":x:  **|  Which result would you like to view?**" };

    // Get result number
    const resultNumber: number = parseInt(input);
    if ((!resultNumber) || (resultNumber < 1)) return { error: ":x:  **|  That result number is invalid**" };

    // Get result
    const result: ListedPR = data[resultNumber - 1];
    if (!result) return { error: ":x:  **|  That result number is invalid**" };

    // View pr
    return {
        module: () => pr(userRequest, command.metadata.ownerName, command.metadata.name, result.number),
        url: prURL(command.metadata.ownerName, command.metadata.name, result.number)
    };
}