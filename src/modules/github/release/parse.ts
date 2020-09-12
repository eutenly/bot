import { ParserData } from "../../../classes/Command/Command";

export interface GitHubRelease {
    name: string;
    tag: string;
    text: string;
    zipball: string;
    tarball: string;
    user: string;
    createdOn: string;
}

export default function parse(data: any): ParserData {

    // Authorization failed
    if (data.message === "Bad credentials") return { authorizationFailed: true };

    // No issue
    if (data.message) return { noData: true };

    // Return
    return {
        data: {
            name: data.name,
            tag: data.tag_name,
            text: data.body,
            zipball: data.zipball_url,
            tarball: data.tarball_url,
            user: data.author.login,
            createdOn: data.created_at
        }
    };
}