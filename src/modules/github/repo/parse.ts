import { ParserData } from "../../../classes/Command/Command";

export default function parse(data: any): ParserData | undefined {

    // No repo
    if (data.message) return;

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