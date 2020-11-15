import { ParserData } from "../../../classes/Command/Command";

export interface GitHubRepo {
    name: string;
    ownerName: string;
    description: string;
}

export interface GitHubNotification {
    repoName: string;
    repoOwnerName: string;
    type: string;
}

export interface GitHubHome {
    username: string;
    watchedRepos: GitHubRepo[];
    starredRepos: GitHubRepo[];
    notifications: GitHubNotification[];
}

export default function parse(data: any, extraData?: any[]): ParserData | undefined {

    // Parse extra data
    const watchedRepos: any = extraData && extraData[0];
    const starredRepos: any = extraData && extraData[1];
    const notifications: any = extraData && extraData[2];

    // Return
    return {
        data: {
            username: data.login,
            watchedRepos: watchedRepos.map((r: any) => ({
                name: r.name,
                ownerName: r.owner.login,
                description: r.description
            })),
            starredRepos: starredRepos.map((r: any) => ({
                name: r.name,
                ownerName: r.owner.login,
                description: r.description
            })),
            notifications: notifications.map((n: any) => ({
                repoName: n.repository.name,
                repoOwnerName: n.repository.owner.login,
                type: n.reason
            }))
        }
    };
}