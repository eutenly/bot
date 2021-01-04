import Command, { ViewData } from "../../../classes/Command/Command";
import UserRequest from "../../../classes/UserRequest/UserRequest";
import file, { url as fileURL } from "../file/main";
import files, { url as filesURL } from "../files/main";
import { ListedFile } from "../types";

export default function view(data: ListedFile[], userRequest: UserRequest, command: Command): ViewData | undefined {

    // Get params
    const input: string | undefined = userRequest.getParameter<string>("result") || userRequest.getParameter<string>("link-or-result");
    if (!input) return { error: ":x:  **|  Which result would you like to view?**" };

    // Previous directory
    if ((command.metadata.path) && (parseInt(input) === 1)) return {
        module: () => files(userRequest, command.metadata.ownerName, command.metadata.name, command.metadata.path.split("/").slice(0, command.metadata.path.split("/").length - 1).join("/")),
        url: filesURL(command.metadata.ownerName, command.metadata.name, command.metadata.path.split("/").slice(0, command.metadata.path.split("/").length - 1).join("/"))
    };

    // Get result number
    const resultNumber: number = parseInt(input) - (command.metadata.path ? 1 : 0);
    if ((!resultNumber) || (resultNumber < 1)) return { error: ":x:  **|  That result number is invalid**" };

    // Get result
    const result: ListedFile = data[resultNumber - 1];
    if (!result) return { error: ":x:  **|  That result number is invalid**" };

    // View file
    if (result.type === "dir") return {
        module: () => files(userRequest, command.metadata.ownerName, command.metadata.name, result.path),
        url: filesURL(command.metadata.ownerName, command.metadata.name, result.path)
    };
    else return {
        module: () => file(userRequest, command.metadata.ownerName, command.metadata.name, result.path),
        url: fileURL(command.metadata.ownerName, command.metadata.name, result.path)
    };
}