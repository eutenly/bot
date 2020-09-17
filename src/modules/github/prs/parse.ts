import { ParserData } from "../../../classes/Command/Command";

export interface GitHubSearchResult {
    title: string;
    number: number;
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
            title: d.title,
            number: d.number,
            text: d.body
        }))
    };
}