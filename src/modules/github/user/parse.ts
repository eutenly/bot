import { ParserData } from "../../../classes/Command/Command";

export default function parse(data: any): ParserData | undefined {

    // No repo
    if (data.message) return;

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