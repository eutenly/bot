import { ParserData } from "../../../classes/Command/Command";

export interface GitHubSearchResult {
    name: string;
    type: string;
    path: string;
    size: number;
}

export default function parse(data?: any): ParserData {

    // No data
    if (data.message) return { noData: true };

    // Return
    return {
        data: data.map((d: any) => ({
            name: d.name,
            type: d.type,
            path: d.path,
            size: d.size
        }))
    };
}