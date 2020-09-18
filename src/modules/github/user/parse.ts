import { ParserData } from "../../../classes/Command/Command";

export interface GitHubUser {
    name: string;
    bio?: string;
    repos: number;
    followers: number;
    gists: number;
    location?: string;
    website?: string;
    company?: string;
    createdOn: string;
}

export default function parse(data: any): ParserData {

    // No repo
    if (data.message) return { noData: true };

    // Return
    return {
        data: {
            name: data.login,
            bio: data.bio,
            repos: data.public_repos,
            followers: data.followers,
            gists: data.public_gists,
            location: data.location,
            website: data.blog,
            company: data.company,
            createdOn: data.created_at
        }
    };
}