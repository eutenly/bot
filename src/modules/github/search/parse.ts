import { ParserData } from "../../../classes/Command/Command";

export interface GitHubSearchResult {
    name: string;
    ownerName: string;
    description?: string;
    stars: number;
    forks: number;
}

export default function parse(data?: any): ParserData | undefined {

    // No data
    if (data.message) return;

    // Return
    return {
        data: data.items.map((d: any) => ({
            name: d.name,
            ownerName: d.owner.login,
            description: d.description,
            stars: d.stargazers_count,
            forks: d.forks
        }))
    };
}