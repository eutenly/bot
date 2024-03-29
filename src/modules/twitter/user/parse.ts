import { ParserData } from "../../../classes/Command/Command";

export default function parse(data: any): ParserData | undefined {

    // No user
    if (data.errors) return;

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