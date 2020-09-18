import { ParserData } from "../../../classes/Command/Command";

export interface GitHubSearchResult {
    id: number;
    name: string;
    description?: string;
}

export default function parse(data?: any): ParserData {

    // No data
    if (data.message) return { noData: true };

    // Return
    return {
        data: data.map((d: any) => ({
            id: d.id,
            name: Object.keys(d.files)[0],
            description: d.description
        }))
    };
}