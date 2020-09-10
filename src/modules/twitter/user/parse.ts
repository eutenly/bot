import { ParserData } from "../../../classes/Command/Command";

export interface TwitterUser {
    id: string;
    name: string;
    handle: string;
    bio: string;
    followers: number;
    following: number;
    tweets: number;
    likes: number;
    location?: string;
    url?: string;
    banner?: string;
    createdOn: string;
}

export default function parse(data: any): ParserData {

    // Authorization failed
    if ((data.errors) && ([215, 32].includes(data.errors[0].code))) return { authorizationFailed: true };

    // No user
    if (data.errors) return { noData: true };

    // Return
    return {
        data: {
            id: data.id_str,
            name: data.name,
            handle: data.screen_name,
            bio: data.description,
            followers: data.followers_count,
            following: data.friends_count,
            tweets: data.statuses_count,
            likes: data.favourites_count,
            location: data.location,
            url: data.url && data.entities.url.urls[0].expanded_url,
            banner: data.profile_banner_url,
            createdOn: data.created_at
        }
    };
}