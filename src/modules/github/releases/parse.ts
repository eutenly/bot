import { ParserData } from "../../../classes/Command/Command";

export interface GitHubSearchResult {
    id: number;
    name?: string;
    tag: string;
    text: string;
}

export default function parse(data?: any): ParserData | undefined {

    // No data
    if (data.message) return;

    // Return
    return {
        data: data.map((d: any) => ({
            id: d.id,
            name: d.name,
            tag: d.tag_name,
            text: d.body
        }))
    };
}