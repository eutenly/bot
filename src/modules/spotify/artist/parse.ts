import { ParserData } from "../../../classes/Command/Command";

export interface SpotifyAlbum {
    id: string;
    name: string;
    tracks: number;
}

export interface SpotifyArtist {
    id: string;
    name: string;
    followers: number;
    albums: SpotifyAlbum[];
    genres: string[];
    avatar?: string;
}

export default function parse(data: any, extraData?: any[]): ParserData {

    // Authorization failed
    if (data.error?.message === "Invalid access token") return { authorizationFailed: true };

    // Token expired
    if (data.error?.message === "The access token expired") return { tokenExpired: true };

    // No results
    if ((data.error) || (!extraData)) return { noData: true };

    // Parse extra data
    const albumData: any = extraData[0];

    // Return
    return {
        data: {
            id: data.id,
            name: data.name,
            followers: data.followers.total,
            albums: albumData.items.map((a: any) => ({
                id: a.id,
                name: a.name,
                tracks: a.total_tracks
            })),
            genres: data.genres,
            avatar: data.images[0] && data.images[0].url
        }
    };
}