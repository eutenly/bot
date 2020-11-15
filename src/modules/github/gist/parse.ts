import { ParserData } from "../../../classes/Command/Command";

export interface GitHubGist {
    id: number;
    description?: string;
    comments: number;
    files: string[];
    forks: number;
    createdOn: string;
}

export default function parse(data: any): ParserData | undefined {

    // No issue
    if (data.message) return;

    // Return
    return {
        data: {
            id: data.id,
            description: data.description || undefined,
            comments: data.comments,
            files: Object.keys(data.files),
            forks: data.forks.length,
            createdOn: data.created_at
        }
    };
}