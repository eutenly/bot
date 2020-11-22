import { ParserData } from "../../../classes/Command/Command";

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
                description: r.description,
                private: r.private
            })),
            starredRepos: starredRepos.map((r: any) => ({
                name: r.name,
                ownerName: r.owner.login,
                description: r.description,
                private: r.private
            })),
            notifications: notifications.map((n: any) => ({
                repoName: n.repository.name,
                repoOwnerName: n.repository.owner.login,
                type: n.reason
            }))
        }
    };
}