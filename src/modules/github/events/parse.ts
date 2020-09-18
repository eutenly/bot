import { ParserData } from "../../../classes/Command/Command";

interface GitHubUser {
    id: string;
    name: string;
}

interface GitHubRepo {
    id: string;
    name: string;
}

export interface GitHubSearchResult {
    type: string;
    data: any;
    user: GitHubUser;
    repo: GitHubRepo;
    timestamp: string;
}

export default function parse(data?: any): ParserData {

    // No data
    if (data.message) return { noData: true };

    // Return
    return {
        data: data.map((d: any) => ({
            type: d.type,
            data: d.payload,
            user: {
                id: d.actor.id,
                name: d.actor.login
            },
            repo: {
                id: d.repo.id,
                name: d.repo.name
            },
            timestamp: d.created_at
        }))
    };
}