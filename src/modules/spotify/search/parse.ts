import { ParserData } from "../../../classes/Command/Command";

interface SpotifyUser {
    id: string;
    name: string;
}

export interface SpotifySearchResult {
    id: string;
    name: string;
    description?: string;
    artist?: SpotifyUser;
    owner?: SpotifyUser;
    length?: number;
    followers?: number;
    tracks?: number;
}

export default function parse(data?: any): ParserData {

    // Authorization failed
    if (data.error?.message === "Invalid access token") return { authorizationFailed: true };

    // Token expired
    if (data.error?.message === "The access token expired") return { tokenExpired: true };

    // Get results
    const results: any[] = (data.tracks || data.artists || data.albums || data.playlists || data.episodes).items;

    // No data
    if (results.length === 0) return { noData: true };

    // Return
    return {
        data: results.map((d: any) => ({
            id: d.id,
            name: d.name,
            description: d.description,
            artist: d.artists && {
                id: d.artists[0].id,
                name: d.artists[0].name
            },
            owner: d.owner && {
                id: d.owner.id,
                name: d.owner.display_name
            },
            length: d.duration_ms,
            followers: d.followers?.total,
            tracks: d.total_tracks || d.tracks?.total
        }))
    };
}