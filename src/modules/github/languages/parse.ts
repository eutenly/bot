import { ParserData } from "../../../classes/Command/Command";

export interface GitHubLanguages {
    [index: string]: number;
}

export default function parse(data: any): ParserData {

    // No issue
    if (data.message) return { noData: true };

    // Return
    return {
        data
    };
}