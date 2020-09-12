import { ParserData } from "../../../classes/Command/Command";

export interface GitHubRepo {
    name: string;
    ownerName: string;
    description?: string;
    stars: number;
    watchers: number;
    forks: number;
    license?: string;
    language?: string;
    website?: string;
    hasIssues: boolean;
    createdOn: string;
}

export default function parse(data: any): ParserData {

    // Authorization failed
    if (data.message === "Bad credentials") return { authorizationFailed: true };

    // No repo
    if (data.message) return { noData: true };

    // Return
    return {
        data: {
            name: data.name,
            ownerName: data.owner.login,
            description: data.description,
            stars: data.stargazers_count,
            watchers: data.subscribers_count,
            forks: data.forks,
            license: data.license && data.license.name,
            language: data.language,
            website: data.homepage,
            hasIssues: data.has_issues,
            createdOn: data.created_at
        }
    };
}