import { ParserData } from "../../../classes/Command/Command";

export interface GitHubSearchResult {
    id: number;
    name?: string;
    tag: string;
    text: string;
}

export default function parse(data?: any): ParserData {

    // Authorization failed
    if (data.message === "Bad credentials") return { authorizationFailed: true };

    // No data
    if (data.message) return { noData: true };

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