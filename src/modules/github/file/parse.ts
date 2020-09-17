import { ParserData } from "../../../classes/Command/Command";

export interface GitHubFile {
    name: string;
    content: string;
    path: string;
    size: number;
}

export default function parse(data: any): ParserData {

    // Authorization failed
    if (data.message === "Bad credentials") return { authorizationFailed: true };

    // No issue
    if (data.message) return { noData: true };

    // Return
    return {
        data: {
            name: data.name,
            content: data.content,
            path: data.path,
            size: data.size
        }
    };
}