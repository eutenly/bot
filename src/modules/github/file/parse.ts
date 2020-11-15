import { ParserData } from "../../../classes/Command/Command";

export interface GitHubFile {
    name: string;
    content: string;
    path: string;
    size: number;
}

export default function parse(data: any): ParserData | undefined {

    // No issue
    if (data.message) return;

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