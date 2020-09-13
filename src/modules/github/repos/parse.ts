import { ParserData } from "../../../classes/Command/Command";

export interface GitHubSearchResult {
    name: string;
    ownerName: string;
    description?: string;
    stars: number;
    forks: number;
}

export default function parse(data?: any): ParserData {

    // Authorization failed
    if (data.message === "Bad credentials") return { authorizationFailed: true };

    // No data
    if (data.message) return { noData: true };

    // Return
    return {
        data: data.map((d: any) => ({
            name: d.name,
            ownerName: d.owner.login,
            description: d.description,
            stars: d.stargazers_count,
            forks: d.forks
        }))
    };
}