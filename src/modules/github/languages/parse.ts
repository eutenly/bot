import { ParserData } from "../../../classes/Command/Command";

export interface GitHubLanguages {
    [index: string]: number;
}

export default function parse(data: any): ParserData | undefined {

    // No issue
    if (data.message) return;

    // Return
    return {
        data
    };
}